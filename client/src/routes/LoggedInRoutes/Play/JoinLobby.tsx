import { useLocation, useNavigate } from "react-router-dom";
import { useGame } from "./Context/GameContext";

type JoinLobbyProps = {};

export default function JoinLobby({}: JoinLobbyProps) {
    // const [code, setCode] = useState("");

    const { hash } = useLocation();
    const navigate = useNavigate();
    const { setInLobby, socket } = useGame();

    // useEffect(() => {
    // 	navigate("#" + code);
    // }, [code]);

    const joinGame = (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (hash) {
            setInLobby(true);
            socket.emit("join_game", {
                lobby: hash,
            });
        }
    };

    return (
        <>
            <form onSubmit={joinGame}>
                <input
                    type="text"
                    placeholder="enter lobby code..."
                    value={hash.substring(1)}
                    onChange={(e) => {
                        navigate("#" + e.target.value.replace(" ", ""));
                    }}
                />
                <button type="submit">join/create game</button>
            </form>
        </>
    );
}
