import Play from "../Play/Play";
import GameProvider from "./GameContext";

type PlayProps = {};

export default function Provider({}: PlayProps) {
    // const { hash } = useLocation();
    // const navigate = useNavigate();
    return (
        <GameProvider>
            <Play />
        </GameProvider>
    );
}
