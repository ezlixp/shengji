import { useEffect } from "react";
import { useGame } from "./Context/GameContext";
import CardDisplay from "./components/CardDisplay/CardDisplay";

type DisplayBidsProps = {};

export default function DisplayBids({}: DisplayBidsProps) {
    const { socket, bids, setBids } = useGame();

    useEffect(() => {
        socket.on("new_bid", (data) => {
            setBids((oldBids) => [...oldBids, data.new_bid]);
        });

        return () => {
            socket.off("new_bid");
        };
    }, []);

    return (
        <div>
            {bids.map((bid, i) => {
                return <CardDisplay key={i} text={"real bid"} cards={bid} />;
            })}
        </div>
    );
}
