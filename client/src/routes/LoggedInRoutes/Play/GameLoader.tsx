import { useEffect } from "react";
import Game from "./Game";
import { useGame } from "./GameContext";
import JoinLobby from "./JoinLobby";
import { useLocation } from "react-router-dom";

export default function GameLoader() {
	const { inLobby, setInLobby } = useGame();
	const { hash } = useLocation();

	useEffect(() => {
		setInLobby(false);
	}, [hash]);

	return <>{inLobby ? <Game /> : <JoinLobby />}</>;
}
