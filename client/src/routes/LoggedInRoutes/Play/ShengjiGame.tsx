import React, { useState, useEffect } from "react";
import { useGame } from "./Context/GameContext";
import { useLocation } from "react-router-dom";
import { cardType } from "../../../types/socketioTypes";

type ShengjiGameProps = {};

export default function ShengjiGame({}: ShengjiGameProps) {
    const suitOrder = { Diamonds: 1, Clubs: 2, Hearts: 3, Spades: 4 };

    const [turnNum, setTurnNum] = useState<number>(0);
    const [gameState, setGameState] = useState<string>("drawing"); // drawing, bidding, or playing

    const { hash } = useLocation();
    const { socket, myTurnNum, cards, setCards, rankVals } = useGame();

    useEffect(() => {
        socket.on("next_turn", (data) => {
            setTurnNum(data.nextTurn);
        });

        socket.on("update_cards", (data) => {
            setCards((oldCards: cardType[]) => [...oldCards, data.nextCard]);
        });

        socket.on("update_game_state", (data) => {
            setGameState(data.nextGameState);
        });

        // socket.on("get_deck", (data) => {
        //     // data.deck (array of cardtypes, the deck)
        //     console.log(data.deck);
        // });

        return () => {
            socket.off("next_turn");
            socket.off("update_cards");
            socket.off("get_deck");
        };
    }, []);

    useEffect(() => {
        let timeout: ReturnType<typeof setTimeout>;
        if (turnNum === myTurnNum) {
            switch (gameState) {
                case "drawing":
                    timeout = setTimeout(() => {
                        socket.emit("did_turn", { lobby: hash, gameState: gameState, nextTurn: (myTurnNum + 1) % 4 });
                    }, 200);
                    break;
                case "bidding":
                    break;
                case "playing":
                    break;
            }
        }
        return () => {
            clearTimeout(timeout);
        };
    }, [turnNum]);

    useEffect(() => {
        cards.sort((a, b) => {
            if (a.trump || b.trump) {
                return rankVals[b.rank as keyof typeof rankVals] - rankVals[a.rank as keyof typeof rankVals];
            } else {
                if (a.suit !== b.suit) {
                    return suitOrder[b.suit as keyof typeof suitOrder] - suitOrder[a.suit as keyof typeof suitOrder];
                } else {
                    return rankVals[a.rank as keyof typeof rankVals] - rankVals[b.rank as keyof typeof rankVals];
                }
            }
        });
    }, [cards]);

    return (
        <>
            <p>omg in game BEEEEEEP</p>
            {cards.map((card, i) => {
                return (
                    <React.Fragment key={i}>
                        {card.rank + " " + card.suit + " " + (card.trump ? "trump" : "not trump")}
                        <br />
                    </React.Fragment>
                );
            })}
            <br />
            <p>{turnNum}</p>
            <p>{gameState}</p>
        </>
    );
}
