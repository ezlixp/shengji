import { useEffect } from "react";
import defaultProps from "../../../types/defaultProps";
import { useGame } from "./GameContext";
import GameLobby from "./GameLobby";
import ShengjiGame from "./ShengjiGame";

type GameProps = {};

export default function Game(props: defaultProps<GameProps>) {
	const { socket, playing, players, setPlayers } = useGame();

	useEffect(() => {
		socket.on("receive_players", (data: { players: string[] }) => {
			setPlayers(data.players);
		});
	});
	return (
		<div className={props.className}>
			<ul>
				{players.map((player) => {
					return <li key={player}>{player}</li>;
				})}
			</ul>
			{playing ? <ShengjiGame /> : <GameLobby />}
		</div>
	);
}
