export interface ServerToClientEvents {
	receive_message: (input: { message: string }) => void;
	receive_players: (input: { players: string[] }) => void;
}

export interface ClientToServerEvents {
	join_game: (input: { lobby: string }) => void;
	send_message: (input: { message: string; lobby: string }) => void;
}

export interface InterServerEvents {
	ping: () => void;
}

export interface SocketData {
	name: string;
	age: number;
}
