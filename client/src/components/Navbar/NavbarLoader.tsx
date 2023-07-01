import { useAuth } from "../../contexts/authContext";
import NavbarLoggedIn from "./NavbarLoggedIn";
import NavbarLoggedOut from "./NavbarLoggedOut";
import defaultProps from "../../types/defaultProps";

export default function NavbarLoader(props: defaultProps) {
	const { currentUser } = useAuth();

	return (
		<div className={props.className}>
			{currentUser ? <NavbarLoggedIn /> : <NavbarLoggedOut />}
		</div>
	);
}
