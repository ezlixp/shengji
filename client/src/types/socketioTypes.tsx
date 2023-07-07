export type PlayerProfileType = {
	elo: number;
	email: string;
	username: string;
	__v: number;
	_id: string;
};

export interface ServerToClientEvents {
	receive_message: (input: { from: string; message: string }) => void;
	receive_players: (input: { players: string[] }) => void;
}

export interface ClientToServerEvents {
	join_game: (input: { lobby: string }) => void;
	send_message: (input: { message: string; lobby: string }) => void;
	set_profile: (profile: PlayerProfileType) => void;
	secret_command: (args: string[]) => void;
}

export interface InterServerEvents {
	ping: () => void;
}

export interface SocketData {
	profile: PlayerProfileType;
}
