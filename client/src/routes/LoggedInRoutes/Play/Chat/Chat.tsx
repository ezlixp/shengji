import { useEffect, useState } from "react";
import { useGame } from "../Context/GameContext";
import { useLocation } from "react-router-dom";
import styles from "./Chat.module.css";

type ChatProps = {};

type MessageType = {
    from: string;
    message: string;
};

export default function Chat({}: ChatProps) {
    const [received, setReceived] = useState<MessageType | null>(null);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<MessageType[]>([]);
    const validCommands = ["/test_win"];

    const { hash } = useLocation();
    const { socket } = useGame();

    const sendMessage = () => {
        if (message) {
            if (message.startsWith("/") && validCommands.includes(message.split(" ")[0])) {
                socket.emit(message.split(" ")[0] as "secret_command", message.split(" ").slice(1));
                console.log("omg secret command!!!!");
            } else {
                socket.emit("send_message", {
                    message: message,
                    lobby: hash,
                });
            }
        }
        setMessage("");
    };

    useEffect(() => {
        // data.message (string, message receieved), data.from (string, who sent the message), data.decoration (object, text decoration for the message)
        socket.on("receive_message", (data) => {
            // data.message (string, message receieved), data.from (string, who sent the message)
            setReceived({ from: data.from, message: data.message });
        });
    }, []);

    useEffect(() => {
        received && setMessages((prev) => [...prev, received]);
        setReceived(null);
    }, [received]);
    return (
        <>
            <div className={styles["chat-card"]}>
                <>
                    <div className={styles.messages}>
                        {messages.map((m, i) => {
                            return (
                                <p key={i}>
                                    {m.from}: {m.message}
                                </p>
                            );
                        })}
                    </div>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            sendMessage();
                        }}
                    >
                        <input placeholder="Message..." value={message} onChange={(e) => setMessage(e.target.value)} />
                        <button type="submit">Send Message!</button>
                    </form>
                </>
            </div>
        </>
    );
}
