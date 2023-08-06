export type PlayerProfileType = {
    elo: number;
    email: string;
    username: string;
    __v: number;
    _id: string;
};

export type CardType = {
    rank: string;
    suit: string;
    trump: boolean;
};

export interface ServerToClientEvents {
    receive_message: (input: { from: string; message: string }) => void;
    receive_players: (input: { players: PlayerProfileType[] }) => void;
    game_started: (input: { trumpRank: string }) => void;
    get_deck: (input: { deck: CardType[] }) => void;
    set_turn_num: (input: { turnNum: number }) => void;
    next_turn: (input: { nextTurn: number }) => void;
    update_cards: (input: { nextCard: CardType }) => void;
    update_game_state: (input: { nextGameState: string }) => void;
    new_bid: (input: { new_bid: CardType[] }) => void;
}

export interface ClientToServerEvents {
    join_game: (input: { lobby: string }) => void;
    send_message: (input: { message: string }) => void;
    set_profile: (profile: PlayerProfileType) => void;
    secret_command: (args: string[]) => void;
    start_game: () => void;
    did_turn: (input: { gameState: string; nextTurn: number }) => void;
    bid: (input: { bid: CardType[] }) => void;
}

export interface InterServerEvents {
    ping: () => void;
}
