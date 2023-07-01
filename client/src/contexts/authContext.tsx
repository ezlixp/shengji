import { createContext, useContext, useEffect, useState } from "react";
import auth from "../firebase.tsx";
import childrenProps from "../types/childrenProps.tsx";
import { UserInfo as UserType } from "firebase/auth";

type authContextType = {
	currentUser: UserType | null;
	signup: Function;
	login: Function;
	logout: Function;
};

const AuthContext = createContext<authContextType>({} as authContextType);

export function useAuth() {
	return useContext(AuthContext);
}

export default function AuthProvider(props: childrenProps) {
	const [currentUser, setCurrentUser] = useState<UserType | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	function signup(email: string, password: string) {
		return auth.createUserWithEmailAndPassword(email, password);
	}
	function login(email: string, password: string) {
		return auth.signInWithEmailAndPassword(email, password);
	}
	function logout() {
		return auth.signOut();
	}
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user: UserType | null) => {
			setCurrentUser(user);
			setLoading(false);
		});
		return unsubscribe;
	});
	const value = {
		currentUser,
		signup,
		login,
		logout,
	};
	return (
		<AuthContext.Provider value={value}>
			{!loading && props.children}
		</AuthContext.Provider>
	);
}
