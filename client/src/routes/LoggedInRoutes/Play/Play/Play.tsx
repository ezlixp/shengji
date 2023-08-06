import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Chat from "../components/Chat/Chat";
import { useGame } from "../Context/GameContext";
import JoinLobby from "../JoinLobby";
import ShengjiGame from "../ShengjiGame/ShengjiGame";
import GameLobby from "../GameLobby";
import Disconnected from "../Disconnected";
import styles from "./Play.module.css";

type Props = {};

export default function Play({}: Props) {
    const { inLobby, setInLobby, playing, connected } = useGame();
    const { hash } = useLocation();

    useEffect(() => {
        setInLobby(false);
    }, [hash]);

    return (
        <>
            {connected ? (
                <>
                    {inLobby ? (
                        <div className={styles.content}>
                            <div className={styles.left}>{playing ? <ShengjiGame /> : <GameLobby />}</div>
                            <Chat />
                        </div>
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
