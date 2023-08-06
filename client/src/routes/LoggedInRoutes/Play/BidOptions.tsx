import { useState, useEffect } from "react";
import { useGame } from "./Context/GameContext";
import { CardType } from "../../../types/socketioTypes";
import CardDisplay from "./components/CardDisplay/CardDisplay";

type BidOptionsProps = {};

export default function BidOptions({}: BidOptionsProps) {
    const suitOrder = { "": 0, Diamonds: 1, Clubs: 2, Hearts: 3, Spades: 4, LJ: 5, HJ: 6 };

    const [bidOptions, setBidOptions] = useState<CardType[][]>([]);

    const { socket, cards, bids } = useGame();
    useEffect(() => {
        const toBeat = bids[bids.length - 1] || [{ rank: "0", suit: "", trump: false }];
        const trumps = cards.filter((card) => card.trump);
        const options: CardType[][] = [];
        const didSuit = { Diamonds: false, Clubs: false, Hearts: false, Spades: false };
        trumps.forEach((card, i) => {
            if (toBeat.length == 1) {
                if (
                    card.suit !== "LJ" &&
                    card.suit !== "HJ" &&
                    suitOrder[card.suit as keyof typeof suitOrder] >
                        suitOrder[toBeat[0].suit as keyof typeof suitOrder] &&
                    !didSuit[card.suit as keyof typeof didSuit]
                ) {
                    options.push([card]);
                    didSuit[card.suit as keyof typeof didSuit] = true;
                }
                if (i < trumps.length - 1 && card.suit === trumps[i + 1].suit && card.rank === trumps[i + 1].rank) {
                    options.push([card, trumps[i + 1]]);
                }
            } else {
                if (
                    i < trumps.length - 1 &&
                    card.suit === trumps[i + 1].suit &&
                    card.rank === trumps[i + 1].rank &&
                    suitOrder[card.suit as keyof typeof suitOrder] > suitOrder[toBeat[0].suit as keyof typeof suitOrder]
                ) {
                    options.push([card, trumps[i + 1]]);
                }
            }
        });
        // console.log(options);
        setBidOptions(options);
    }, [cards, bids]);
    return (
        <>
            {bidOptions.map((option, i) => {
                return (
                    <CardDisplay
                        onClick={() => {
                            socket.emit("bid", { bid: option });
                        }}
                        key={i}
                        text={"Bid number" + (i + 1)}
                        cards={option}
                    />
                );
            })}
        </>
    );
}
