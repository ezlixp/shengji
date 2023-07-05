import styles from "./Base.module.css";

export default function Base() {
	// const { logout, currentUser } = useAuth();
	// const [error, setError] = useState("");
	// const navigate = useNavigate();
	return (
		<>
			<div className={styles["title-box"]}>
				<h1>Shengji</h1>
				<h3>omg shengji</h3>
			</div>
			<div className={styles["more-content"]}>
				<h1>Shengji</h1>
				<p>
					shengji
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br /> bottom text
				</p>
			</div>
		</>
	);
}
