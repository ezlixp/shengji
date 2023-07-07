import { createContext, useContext, useMemo, useState, useEffect } from "react";
import { Socket, io } from "socket.io-client";
import {
	ClientToServerEvents,
	ServerToClientEvents,
} from "../../../../types/socketioTypes";
import { childrenProps } from "../../../../types/propTypes";
import axios from "axios";
import { useAuth } from "../../../../contexts/authContext";

// console.log(import.meta.env.VITE_REACT_APP_BASE_URL);
const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
	import.meta.env.VITE_REACT_APP_BASE_URL
);

type GameContextType = {
	socket: Socket<ServerToClientEvents, ClientToServerEvents>;
	players: string[];
	setPlayers: Function;
	inLobby: boolean;
	setInLobby: Function;
	playing: boolean;
	setPlaying: Function;
	connected: boolean;
};

const GameContext = createContext<GameContextType>({} as GameContextType);

export function useGame() {
	return useContext(GameContext);
}

export default function GameProvider({ children }: childrenProps) {
	const [players, setPlayers] = useState<string[]>([]);
	const [playing, setPlaying] = useState(false);
	const [inLobby, setInLobby] = useState(false);
	const [connected, setConnected] = useState(true);
	const [loading, setLoading] = useState(true);
	const { currentUser } = useAuth();
	const player = useMemo(async () => {
		if (currentUser) {
			return await axios
				.post(`${import.meta.env.VITE_REACT_APP_BASE_URL}getUser`, {
					email: currentUser!.email,
				})
				.then((res) => {
					return res.data[0];
				});
		} else {
			return null;
		}
	}, [currentUser]);
	useEffect(() => {
		player.then((res) => {
			if (res) socket.emit("set_profile", res);
			setLoading(false);
		});
		socket.on("disconnect", () => {
			console.log("you were disconnected");
			setConnected(false);
		});
	}, []);

	const value = {
		socket: socket,
		players: players,
		setPlayers: setPlayers,
		inLobby: inLobby,
		setInLobby: setInLobby,
		playing: playing,
		setPlaying: setPlaying,
		connected: connected,
	};

	return (
		<GameContext.Provider value={value}>
			{!loading && children}
		</GameContext.Provider>
	);
}
