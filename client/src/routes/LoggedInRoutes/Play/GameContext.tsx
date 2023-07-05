import { createContext, useContext, useState } from "react";
import { Socket, io } from "socket.io-client";
import {
	ClientToServerEvents,
	ServerToClientEvents,
} from "../../../types/socketioTypes";
import childrenProps from "../../../types/childrenProps";

// console.log(import.meta.env.VITE_REACT_APP_BASE_URL);
const socket = io(import.meta.env.VITE_REACT_APP_BASE_URL);

type GameContextType = {
	socket: Socket<ServerToClientEvents, ClientToServerEvents>;
	players: string[];
	setPlayers: Function;
	inLobby: boolean;
	setInLobby: Function;
	playing: boolean;
	setPlaying: Function;
};

const GameContext = createContext<GameContextType>({} as GameContextType);

export function useGame() {
	return useContext(GameContext);
}

export default function GameProvider(props: childrenProps) {
	const [players, setPlayers] = useState<string[]>([]);
	const [playing, setPlaying] = useState(false);
	const [inLobby, setInLobby] = useState(false);

	const value = {
		socket: socket,
		players: players,
		setPlayers: setPlayers,
		inLobby: inLobby,
		setInLobby: setInLobby,
		playing: playing,
		setPlaying: setPlaying,
	};

	// console.log(value.socket);
	return (
		<GameContext.Provider value={value}>
			{props.children}
		</GameContext.Provider>
	);
}
