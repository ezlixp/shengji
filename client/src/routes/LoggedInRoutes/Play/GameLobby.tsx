import { useEffect, useState } from "react";
import { useGame } from "./Context/GameContext";

type GameLobbyProps = {};

export default function GameLobby({}: GameLobbyProps) {
    const [error, setError] = useState("");

    const { players, setPlayers, playing, setPlaying, setMyTurnNum, rankVals, setRankVals, socket } = useGame();

    const tryStart = () => {
        if (players.length === 4) {
            socket.emit("start_game");
        } else {
            setError("incorrect number of players");
        }
    };
    useEffect(() => {
        setRankVals({
            "2": 2,
            "3": 3,
            "4": 4,
            "5": 5,
            "6": 6,
            "7": 7,
            "8": 8,
            "9": 9,
            "10": 10,
            J: 11,
            Q: 12,
            K: 13,
            A: 14,
            LJ: 16,
            HJ: 17,
        });

        socket.on("receive_players", (data) => {
            setPlayers(data.players);
        });

        socket.on("game_started", (data) => {
            setRankVals({
                ...rankVals,
                [data.trumpRank as keyof typeof rankVals]: 15,
            });
            setPlaying(true);
        });

        socket.on("set_turn_num", (data) => {
            setMyTurnNum(data.turnNum);
        });
        return () => {
            socket.off("receive_players");
            socket.off("game_started");
            socket.off("set_turn_num");
        };
    }, []);
    return (
        <>
            {error && (
                <>
                    {error}
                    <br />
                </>
            )}
            <ul>
                {players.map((player) => {
                    return <li key={player.username}>{player.username}</li>;
                })}
            </ul>
            <button onClick={tryStart} disabled={playing}>
                start game!
            </button>
        </>
    );
}
