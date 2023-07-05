import { useState } from "react";
import defaultProps from "../../../types/defaultProps";
import { useGame } from "./GameContext";

type GameLobbyProps = {};

export default function GameLobby(props: defaultProps<GameLobbyProps>) {
	const [error, setError] = useState("");

	const { players, setPlaying } = useGame();

	const tryStart = () => {
		if (players.length === 4) {
			setPlaying(true);
		} else {
			setError("incorrect number of players");
		}
	};
	return (
		<div className={props.className}>
			{error}
			<button onClick={tryStart}>start game!</button>
		</div>
	);
}
