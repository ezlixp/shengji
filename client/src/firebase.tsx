import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const config = {
    apiKey: import.meta.env.VITE_REACT_APP_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_REACT_APP_FIREBASE_APP_ID,
};

const app = firebase.initializeApp(config);
if (import.meta.env.DEV) firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
const auth = app.auth();
export default auth;
