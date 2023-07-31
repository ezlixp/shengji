import { useState } from "react";
import { useAuth } from "../../../contexts/authContext";
import { Link } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import Input from "../../../components/Input/Input";
import { email_validation, password_validation, username_validation } from "../../../utils/inputValidations";
import axios from "axios";
import styles from "./Signup.module.css";

export default function SignUp() {
    const methods = useForm({ mode: "onChange" });
    const { signup, errorMessages, authing, setAuthing } = useAuth();
    const [error, setError] = useState<string | null>();
    // const [loading, setLoading] = useState(false);
    // const navigate = useNavigate();
    async function createUser(username: string, email: string, password: string) {
        console.log(await axios.post(`${import.meta.env.VITE_REACT_APP_BASE_URL}/getUser`, { username: username }));
        if (!(await axios.post(`${import.meta.env.VITE_REACT_APP_BASE_URL}/getUser`, { username: username })).data) {
            try {
                setError("");
                setAuthing(true);
                // console.log(email + " " + password);
                signup(email, password)
                    .then(() => {
                        axios.post(`${import.meta.env.VITE_REACT_APP_BASE_URL}/createUser`, {
                            username: username,
                            email: email,
                        });
                    })
                    .catch((err: any) => {
                        if (err.code in errorMessages) {
                            setError(errorMessages[err.code as keyof typeof errorMessages]);
                        } else {
                            setError(err.message);
                        }
                    });
            } catch (error) {
                setError(`Failed to create an account with error ${error}`);
            } finally {
                setAuthing(false);
            }
        } else {
            console.log(await axios.post(`${import.meta.env.VITE_REACT_APP_BASE_URL}/getUser`, { username: username }));
            setError("username taken");
        }
    }

    const handleSubmit = methods.handleSubmit((data) => {
        // console.log(data);
        methods.reset();
        // console.log(data.email + " " + data.password);
        createUser(data.username, data.email, data.password);
    });

    return (
        <div className={styles.container}>
            <div className={styles["sign-up-card"]}>
                <h1>Sign Up</h1>
                {error && error}
                <FormProvider {...methods}>
                    <form className={styles["sign-up-form"]} onSubmit={(e) => e.preventDefault()} noValidate>
                        <Input {...username_validation} />
                        <Input {...email_validation} />
                        <Input {...password_validation} />
                        <button disabled={authing} onClick={handleSubmit}>
                            Sign up!
                        </button>
                        <Link to="/login">already have an account?</Link>
                    </form>
                </FormProvider>
            </div>
        </div>
    );
}
