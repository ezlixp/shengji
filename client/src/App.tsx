import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./routes/Home/Home.tsx";
import Login from "./routes/Login/Login.tsx";
import NotFound from "./routes/NotFound.tsx";
import SignUp from "./routes/Signup.jsx";
import AuthProvider from "./contexts/authContext.tsx";
import NavbarLoader from "./components/Navbar/NavbarLoader.tsx";

export default function App() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<NavbarLoader className="z100" />
				<div className="content">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/login" element={<Login />} />
						<Route path="/signup" element={<SignUp />} />
						<Route path="*" element={<NotFound />} />
						{/* <Route path="/signup" element={<Signup/>}/> */}
					</Routes>
					{import.meta.env.VITE_REACT_APP_FIREBASE_AUTH_DOMAIN}
				</div>
			</AuthProvider>
		</BrowserRouter>
	);
}
