import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

export default function PublicRoute() {
    const { currentUser, authing } = useAuth();

    return !currentUser || authing ? <Outlet /> : <Navigate to="/home" />;
}
