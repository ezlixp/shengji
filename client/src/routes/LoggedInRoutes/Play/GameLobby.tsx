import { useState } from "react";
import { useGame } from "./Context/GameContext";

type GameLobbyProps = {};

export default function GameLobby({}: GameLobbyProps) {
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
		<>
			{error && (
				<>
					{error}
					<br />
				</>
			)}
			<button onClick={tryStart}>start game!</button>
		</>
	);
}
