import { useState, useEffect } from "react";
import { useGame } from "../Context/GameContext";
import { useLocation } from "react-router-dom";
import Card from "../components/Card/Card";
import styles from "./Shengji.module.css";

type ShengjiGameProps = {};

export default function ShengjiGame({}: ShengjiGameProps) {
    const suitOrder = { Diamonds: 1, Clubs: 2, Hearts: 3, Spades: 4 };

    const [turnNum, setTurnNum] = useState<number>(0);
    const [gameState, setGameState] = useState<string>("drawing"); // drawing, bidding, or playing

    const { hash } = useLocation();
    const { socket, myTurnNum, cards, setCards, selected, setSelected, rankVals } = useGame();

    useEffect(() => {
        socket.on("next_turn", (data) => {
            setTurnNum(data.nextTurn);
        });

        socket.on("update_cards", (data) => {
            setCards((oldCards) =>
                [...oldCards, data.nextCard].sort((a, b) => {
                    // add sorting for trump and trump (mostly inbetween trump rank) don't forget to add in <card> too
                    if (a.trump || b.trump) {
                        return rankVals[a.rank as keyof typeof rankVals] - rankVals[b.rank as keyof typeof rankVals];
                    } else {
                        if (a.suit !== b.suit) {
                            return (
                                suitOrder[a.suit as keyof typeof suitOrder] -
                                suitOrder[b.suit as keyof typeof suitOrder]
                            );
                        } else {
                            return (
                                rankVals[a.rank as keyof typeof rankVals] - rankVals[b.rank as keyof typeof rankVals]
                            );
                        }
                    }
                })
            );
        });

        socket.on("update_game_state", (data) => {
            setGameState(data.nextGameState);
        });

        socket.on("get_deck", (data) => {
            // data.deck (array of cardtypes, the deck)
            console.log(data.deck);
        });

        return () => {
            socket.off("next_turn");
            socket.off("update_cards");
            socket.on("update_game_state", (data) => {
                setGameState(data.nextGameState);
            });
            socket.off("get_deck");
        };
    }, []);

    useEffect(() => {
        let timeout: ReturnType<typeof setTimeout>;
        if (turnNum === myTurnNum) {
            switch (gameState) {
                case "drawing":
                    timeout = setTimeout(
                        () =>
                            socket.emit("did_turn", {
                                lobby: hash,
                                gameState: gameState,
                                nextTurn: (myTurnNum + 1) % 4,
                            }),
                        0
                    );
                    break;
                case "bidding":
                    break;
                case "playing":
                    break;
            }
        }
        return () => clearTimeout(timeout);
    }, [turnNum]);

    function toggleSelect(rank: string, suit: string, trump: boolean, s: boolean) {
        if (gameState !== "playing") {
            return;
        }
        if (s) {
            setSelected((old) =>
                old.filter(
                    (_, i) =>
                        i !==
                        selected.findIndex((card) => {
                            return card.rank == rank && card.suit == suit;
                        })
                )
            );
            setCards((oldCards) =>
                [...oldCards, { rank: rank, suit: suit, trump: trump }].sort((a, b) => {
                    // add sorting for trump and trump (mostly inbetween trump rank)
                    if (a.trump || b.trump) {
                        return rankVals[a.rank as keyof typeof rankVals] - rankVals[b.rank as keyof typeof rankVals];
                    } else {
                        if (a.suit !== b.suit) {
                            return (
                                suitOrder[a.suit as keyof typeof suitOrder] -
                                suitOrder[b.suit as keyof typeof suitOrder]
                            );
                        } else {
                            return (
                                rankVals[a.rank as keyof typeof rankVals] - rankVals[b.rank as keyof typeof rankVals]
                            );
                        }
                    }
                })
            );
        } else {
            setCards((old) =>
                old.filter(
                    (_, i) =>
                        i !==
                        cards.findIndex((card) => {
                            return card.rank == rank && card.suit == suit;
                        })
                )
            );
            setSelected((oldSelected) =>
                [...oldSelected, { rank: rank, suit: suit, trump: trump }].sort((a, b) => {
                    // add sorting for trump and trump (mostly inbetween trump rank)
                    if (a.trump || b.trump) {
                        return rankVals[a.rank as keyof typeof rankVals] - rankVals[b.rank as keyof typeof rankVals];
                    } else {
                        if (a.suit !== b.suit) {
                            return (
                                suitOrder[a.suit as keyof typeof suitOrder] -
                                suitOrder[b.suit as keyof typeof suitOrder]
                            );
                        } else {
                            return (
                                rankVals[a.rank as keyof typeof rankVals] - rankVals[b.rank as keyof typeof rankVals]
                            );
                        }
                    }
                })
            );
        }
    }

    return (
        <>
            {/* <p>omg in game BEEEEEEP</p> */}
            {/* do bids here, use last child css to make borders proper*/}
            {selected.length === 0 && gameState === "playing" && <Card rank={"2"} suit={""} trump={false} />}
            <div className={styles.cards}>
                <div className={styles.selected}>
                    {selected.map((card, i) => {
                        return (
                            <span key={i} onClick={() => toggleSelect(card.rank, card.suit, card.trump, true)}>
                                <Card rank={card.rank} suit={card.suit} trump={card.trump} />
                            </span>
                        );
                    })}
                </div>
                <div className={styles.hand}>
                    {cards.map((card, i) => {
                        return (
                            <span key={i} onClick={() => toggleSelect(card.rank, card.suit, card.trump, false)}>
                                <Card rank={card.rank} suit={card.suit} trump={card.trump} />
                            </span>
                        );
                    })}
                </div>
            </div>
            <br />
            <p>{turnNum}</p>
            <p>{gameState}</p>
        </>
    );
}
