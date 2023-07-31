export type PlayerProfileType = {
    elo: number;
    email: string;
    username: string;
    __v: number;
    _id: string;
};

export type cardType = {
    rank: string;
    suit: string;
    trump: boolean;
};

export interface ServerToClientEvents {
    receive_message: (input: { from: string; message: string }) => void;
    receive_players: (input: { players: string[] }) => void;
    game_started: (input: { trumpRank: string }) => void;
    get_deck: (input: { deck: cardType[] }) => void;
    set_turn_num: (input: { turnNum: number }) => void;
    next_turn: (input: { nextTurn: number }) => void;
    update_cards: (input: { nextCard: cardType }) => void;
    update_game_state: (input: { nextGameState: string }) => void;
}

export interface ClientToServerEvents {
    join_game: (input: { lobby: string }) => void;
    send_message: (input: { message: string; lobby: string }) => void;
    set_profile: (profile: PlayerProfileType) => void;
    secret_command: (args: string[]) => void;
    start_game: (input: { lobby: string }) => void;
    did_turn: (input: { lobby: string; gameState: string; nextTurn: number }) => void;
}

export interface InterServerEvents {
    ping: () => void;
}
