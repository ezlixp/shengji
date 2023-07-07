import { useState } from "react";
import styles from "./NavbarLoggedIn.module.css";
import { useAuth } from "../../../contexts/authContext.tsx";
import { Link, useNavigate } from "react-router-dom";
import pfp from "../../../assets/blank-pfp.webp";

export default function NavbarLoggedIn() {
	const { logout } = useAuth();
	const [error, setError] = useState("");
	const [userMenuActive, setUserMenuActive] = useState(false);
	const navigate = useNavigate();

	async function handleLogout() {
		if (!userMenuActive) return;
		else {
			setError("");
			try {
				logout().then(() => navigate("/login"));
			} catch {
				setError("Failed to log out, ur stuck in here FOREVER");
			}
		}
	}

	return (
		<>
			{error && error}
			<nav className={styles.navbar}>
				<Link className={styles.logo} to="/">
					Shengji
				</Link>

				<div className={styles.menu}>
					<ul>
						<li>
							<Link to="/home">Home</Link>
						</li>
						<li className={styles["user-services"]}>
							<button
								onClick={() =>
									setUserMenuActive(!userMenuActive)
								}
								className={styles.pfp}
							>
								<img alt="profile picture" src={pfp} />
							</button>
							<ul
								className={`${
									userMenuActive
										? `${styles.dropdown} ${styles.active}`
										: styles.dropdown
								}`}
							>
								<li>profile</li>
								<li>ur mom</li>
								<li>dummy item</li>
								<li onClick={handleLogout}>sign out</li>
							</ul>
						</li>
					</ul>
				</div>
			</nav>
		</>
	);
}
