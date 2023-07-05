import { useEffect, useState } from "react";
import defaultProps from "../../../types/defaultProps";
import { useGame } from "./GameContext";
import { useLocation } from "react-router-dom";

type ChatProps = {};

export default function Chat(props: defaultProps<ChatProps>) {
	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState<string[]>([]);

	const { hash } = useLocation();
	const { socket, inLobby } = useGame();

	const sendMessage = () => {
		socket.emit("send_message", { message: message, lobby: hash });
	};

	useEffect(() => {
		// console.log(hash, socket, inLobby);
		socket.on("receive_message", (data: { message: string }) => {
			setMessages([...messages, data.message]);
		});
	});
	return (
		<div className={props.className}>
			{inLobby && (
				<>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							sendMessage();
						}}
					>
						<input
							placeholder="Message..."
							onChange={(e) => setMessage(e.target.value)}
						/>
						<button type="submit">Send Message!</button>
					</form>
					<h1>Chat:</h1>
					<ul>
						{messages.map((m, i) => {
							return <li key={i}>{m}</li>;
						})}
					</ul>
				</>
			)}
		</div>
	);
}
