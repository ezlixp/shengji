import { createContext, useContext, useEffect, useState } from "react";
import auth from "../firebase.tsx";
import { UserInfo as UserType } from "firebase/auth";
import { childrenProps } from "../types/propTypes.tsx";

type authContextType = {
    currentUser: UserType | null;
    signup: Function;
    login: Function;
    logout: Function;
    authing: boolean;
    setAuthing: Function;
    errorMessages: ErrorMessagesType;
};

type ErrorMessagesType = {
    "auth/user-not-found": string;
    "auth/wrong-password": string;
    "auth/email-already-in-use": string;
    "auth/too-many-requests": string;
};

const AuthContext = createContext<authContextType>({} as authContextType);

export function useAuth() {
    return useContext(AuthContext);
}

export default function AuthProvider(props: childrenProps) {
    const [currentUser, setCurrentUser] = useState<UserType | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [authing, setAuthing] = useState(false);
    const errorMessages: ErrorMessagesType = {
        "auth/user-not-found": "email incorrect",
        "auth/wrong-password": "password incorrect",
        "auth/email-already-in-use":
            "an account with this email already exists",
        "auth/too-many-requests":
            "you have submitted too many login requests recently, please try again later",
    };
    async function signup(email: string, password: string) {
        try {
            const res = await auth.createUserWithEmailAndPassword(
                email,
                password
            );
            // auth.onAuthStateChanged((user) => {
            // 	if (user) {
            // 		user.updateProfile({
            // 			displayName: username,
            // 		});
            // 		// setCurrentUser(user);
            // 	} else {
            // 		throw "something went wrong";
            // 	}
            // });
            return res;
        } catch (err: any) {
            throw err;
        }
    }
    async function login(email: string, password: string) {
        try {
            const res = await auth.signInWithEmailAndPassword(email, password);
            return res;
        } catch (err: any) {
            throw err;
        }
    }
    function logout() {
        return auth.signOut();
    }
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user: UserType | null) => {
            setLoading(true);
            // console.log(user);
            setCurrentUser(user);
            setLoading(false);
        });
        return unsubscribe;
    }, []);
    const value = {
        currentUser,
        signup,
        login,
        logout,
        authing,
        setAuthing,
        errorMessages,
    };
    return (
        <AuthContext.Provider value={value}>
            {!loading && props.children}
        </AuthContext.Provider>
    );
}
