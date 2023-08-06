import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./routes/LoggedOutRoutes/Login/Login.tsx";
import NotFound from "./routes/NotFound.tsx";
import SignUp from "./routes/LoggedOutRoutes/Signup/Signup.js";
import AuthProvider from "./contexts/authContext.tsx";
import NavbarLoader from "./components/Navbar/NavbarLoader.tsx";
import PrivateRoute from "./components/PrivateRoute.tsx";
import PublicRoute from "./components/PublicRoute.tsx";
import Base from "./routes/LoggedOutRoutes/Base/Base.tsx";
import Home from "./routes/LoggedInRoutes/Home.tsx";
import Provider from "./routes/LoggedInRoutes/Play/Context/Provider.tsx";

export default function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <NavbarLoader />
                <div className="content">
                    <Routes>
                        {/* logged in routes */}

                        <Route element={<PrivateRoute />}>
                            <Route path="/home" element={<Home />} />

                            <Route path="/play" element={<Provider />} />
                        </Route>

                        {/* logged out routes */}

                        <Route element={<PublicRoute />}>
                            <Route path="/" element={<Base />} />

                            <Route path="/login" element={<Login />} />

                            <Route path="/signup" element={<SignUp />} />
                        </Route>

                        {/* neutral routes */}

                        <Route path="*" element={<NotFound />} />
                    </Routes>
                    {/* {import.meta.env.VITE_REACT_APP_FIREBASE_AUTH_DOMAIN} */}
                </div>
            </AuthProvider>
        </BrowserRouter>
    );
}
