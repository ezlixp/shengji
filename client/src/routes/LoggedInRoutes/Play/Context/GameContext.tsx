import { createContext, useContext, useMemo, useState, useEffect } from "react";
import { Socket, io } from "socket.io-client";
import {
    ClientToServerEvents,
    ServerToClientEvents,
    CardType,
    PlayerProfileType,
} from "../../../../types/socketioTypes";
import { childrenProps } from "../../../../types/propTypes";
import axios from "axios";
import { useAuth } from "../../../../contexts/authContext";

// console.log(import.meta.env.VITE_REACT_APP_BASE_URL);
const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(import.meta.env.VITE_REACT_APP_BASE_URL);

type GameContextType = {
    socket: Socket<ServerToClientEvents, ClientToServerEvents>;
    players: PlayerProfileType[];
    setPlayers: React.Dispatch<React.SetStateAction<PlayerProfileType[]>>;
    inLobby: boolean;
    setInLobby: React.Dispatch<React.SetStateAction<boolean>>;
    playing: boolean;
    setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
    cards: CardType[];
    setCards: React.Dispatch<React.SetStateAction<CardType[]>>;
    selected: CardType[];
    setSelected: React.Dispatch<React.SetStateAction<CardType[]>>;
    bids: CardType[][];
    setBids: React.Dispatch<React.SetStateAction<CardType[][]>>;
    myTurnNum: number;
    setMyTurnNum: React.Dispatch<React.SetStateAction<number>>;
    rankVals: {
        "2": number;
        "3": number;
        "4": number;
        "5": number;
        "6": number;
        "7": number;
        "8": number;
        "9": number;
        "10": number;
        J: number;
        Q: number;
        K: number;
        A: number;
        LJ: number;
        HJ: number;
    };
    setRankVals: Function;
    connected: boolean;
};

const GameContext = createContext<GameContextType>({} as GameContextType);

export function useGame() {
    return useContext(GameContext);
}

export default function GameProvider({ children }: childrenProps) {
    const [players, setPlayers] = useState<PlayerProfileType[]>([]);
    const [playing, setPlaying] = useState(false);
    const [inLobby, setInLobby] = useState(false);
    const [connected, setConnected] = useState(true);
    const [loading, setLoading] = useState(true);
    const [cards, setCards] = useState<CardType[]>([]);
    const [selected, setSelected] = useState<CardType[]>([]);
    const [bids, setBids] = useState<CardType[][]>([]);
    const [myTurnNum, setMyTurnNum] = useState<number>(0);
    const [rankVals, setRankVals] = useState({
        "2": 2,
        "3": 3,
        "4": 4,
        "5": 5,
        "6": 6,
        "7": 7,
        "8": 8,
        "9": 9,
        "10": 10,
        J: 11,
        Q: 12,
        K: 13,
        A: 14,
        LJ: 16,
        HJ: 17,
    });

    const { currentUser } = useAuth();
    const player = useMemo(async () => {
        if (currentUser) {
            return await axios
                .post(`${import.meta.env.VITE_REACT_APP_BASE_URL}/getUser`, {
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
            setCards([]);
            setConnected(false);
        });
        return () => {
            socket.off("disconnect");
        };
    }, []);

    const value = {
        socket: socket,
        players: players,
        setPlayers: setPlayers,
        inLobby: inLobby,
        setInLobby: setInLobby,
        playing: playing,
        setPlaying: setPlaying,
        cards: cards,
        setCards: setCards,
        selected: selected,
        setSelected: setSelected,
        bids: bids,
        setBids: setBids,
        myTurnNum: myTurnNum,
        setMyTurnNum: setMyTurnNum,
        rankVals: rankVals,
        setRankVals: setRankVals,
        connected: connected,
    };

    return <GameContext.Provider value={value}>{!loading && children}</GameContext.Provider>;
}
