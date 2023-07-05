import { useEffect } from "react";
import defaultProps from "../../../types/defaultProps";
import GameProvider from "./GameContext";
import Chat from "./Chat";
import GameLoader from "./GameLoader";

type PlayProps = {};

export default function Play(props: defaultProps<PlayProps>) {
	// const { hash } = useLocation();
	// const navigate = useNavigate();
	useEffect(() => {
		console.log("play loaded");
	});
	return (
		<div className={props.className}>
			<GameProvider>
				<Chat />
				<br />
				<GameLoader />
			</GameProvider>
		</div>
	);
}
