import { useAuth } from "../../contexts/authContext";
import NavbarLoggedIn from "./LoggedIn/NavbarLoggedIn.tsx";
import NavbarLoggedOut from "./LoggedOut/NavbarLoggedOut.tsx";

export default function NavbarLoader() {
    const { currentUser } = useAuth();

    return (
        <div className="z100">
            {currentUser ? <NavbarLoggedIn /> : <NavbarLoggedOut />}
        </div>
    );
}
