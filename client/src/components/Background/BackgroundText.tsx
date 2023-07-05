import { useEffect, useState } from "react";
import messagePanEffect from "../../utils/messagePanEffect";
import styles from "./background.module.css";

export default function BackgroundText() {
	const [nameMsg, setNameMsg] = useState("");
	const [imposterMsg, setImposterMsg] = useState("");
	const names = [
		"Henry Xian",
		"Isaac Luo",
		"Phoebe Huang",
		"Warren Sun",
		"Jibril Zarita",
		"Quinn Smile",
	];
	const guilty = [true, false];
	useEffect(() => {
		console.log("useEffect");
		setTimeout(() => {
			console.log("started timeout");

			let nameMessage = names[Math.floor(Math.random() * names.length)];
			let imposterMessage = `was ${
				guilty[Math.floor(Math.random() * 2)] ? "" : "not"
			} The Imposter`;

			messagePanEffect(nameMessage, setNameMsg);

			setTimeout(() => {
				messagePanEffect(imposterMessage, setImposterMsg);
			}, 100 * nameMessage.length);

			setTimeout(() => {
				setNameMsg("");
				setImposterMsg("");
			}, 100 * (nameMessage.length + imposterMessage.length + 3));

			const messageInterval = setInterval(() => {
				console.log("doing interval");

				setNameMsg("");
				setImposterMsg("");

				nameMessage = names[Math.floor(Math.random() * names.length)];
				imposterMessage = `was ${
					guilty[Math.floor(Math.random() * 2)] ? "" : "not"
				} The Imposter`;

				messagePanEffect(nameMessage, setNameMsg);

				setTimeout(() => {
					messagePanEffect(imposterMessage, setImposterMsg);
				}, 100 * nameMessage.length);

				setTimeout(() => {
					setNameMsg("");
					setImposterMsg("");
				}, 100 * (nameMessage.length + imposterMessage.length + 5));
			}, 6850);
			return () => {
				clearInterval(messageInterval);
			};
		}, 2500);
	}, []);

	return (
		<>
			<div className={styles.container}>
				<div className={styles.nameMsg}>{nameMsg}</div>
				<div className={styles.guiltyMsg}>{imposterMsg}</div>
			</div>
		</>
	);
}
