import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Chat from "./Chat/Chat";
import { useGame } from "./Context/GameContext";
import JoinLobby from "./JoinLobby";
import ShengjiGame from "./ShengjiGame";
import GameLobby from "./GameLobby";
import Disconnected from "./Disconnected";

type Props = {};

export default function Play({}: Props) {
    const { inLobby, setInLobby, players, playing, connected } = useGame();
    const { hash } = useLocation();

    useEffect(() => {
        setInLobby(false);
    }, [hash]);

    return (
        <>
            {connected ? (
                <>
                    {inLobby ? (
                        <>
                            <Chat />
                            <ul>
                                {players.map((player) => {
                                    return <li key={player}>{player}</li>;
                                })}
                            </ul>
                            {playing ? <ShengjiGame /> : <GameLobby />}
                        </>
                    ) : (
                        <JoinLobby />
                    )}
                </>
            ) : (
                <Disconnected />
            )}
        </>
    );
}
