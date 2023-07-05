import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./NavbarLoggedOut.module.css";

export default function NavbarLoggedOut() {
	const [active, setActive] = useState(false);
	const [hide, setHide] = useState(false);

	return (
		<div className="z100">
			<nav className={styles.navbar}>
				<Link className={styles.logo} to="/">
					Shengji
				</Link>
				<button
					className={styles.hamburger}
					onClick={() => {
						setHide(false);
						setActive(!active);
					}}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-5 w-5"
						viewBox="0 0 20 20"
						fill="white"
					>
						<path
							fillRule="evenodd"
							d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
							clipRule="evenodd"
						/>
					</svg>
				</button>
				{active}
				<div
					className={`${
						active ? `${styles.menu} ${styles.active}` : styles.menu
					} ${hide ? styles.hidden : ""}`}
				>
					<ul>
						<li>
							<Link
								onClick={() => {
									setActive(false);
									setHide(true);
								}}
								to="/login"
							>
								Login
							</Link>
						</li>
						<li>
							<Link
								onClick={() => {
									setActive(false);
									setHide(true);
								}}
								to="/signup"
							>
								Sign up
							</Link>
						</li>
					</ul>
				</div>
			</nav>
		</div>
	);
}
