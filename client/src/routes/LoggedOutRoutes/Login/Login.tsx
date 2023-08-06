import { useState } from "react";
import { useAuth } from "../../../contexts/authContext";
import { Link } from "react-router-dom";
import styles from "./Login.module.css";
import { FormProvider, useForm } from "react-hook-form";
import Input from "../../../components/Input/Input";
import {
    password_validation,
    username_or_email_validation,
} from "../../../utils/inputValidations";
import axios from "axios";

export default function Login() {
    const methods = useForm({ mode: "onChange" });
    const { login, errorMessages, authing, setAuthing } = useAuth();
    const [error, setError] = useState<string>("");

    const onSubmit = methods.handleSubmit(async (data) => {
        methods.reset();
        try {
            setAuthing(true);
            setError("");
            const temp = await axios.post(
                `${import.meta.env.VITE_REACT_APP_BASE_URL}/getUser`,
                { username: data.username }
            );
            const username = temp.data ? temp.data[0].email : data.username;
            login(username, data.password).catch((err: any) => {
                if (err.code in errorMessages) {
                    setError(
                        errorMessages[err.code as keyof typeof errorMessages]
                    );
                } else {
                    setError(err.message);
                }
            });
        } catch (err: any) {
            setError(err);
        } finally {
            setAuthing(false);
        }
    });
    return (
        <>
            <div className={styles.container}>
                <div className={styles["log-in-card"]}>
                    <h1>Log in</h1>
                    {typeof error === "string" && error}
                    <FormProvider {...methods}>
                        <form
                            className={styles["log-in-form"]}
                            onSubmit={(e) => e.preventDefault()}
                            noValidate
                        >
                            <Input {...username_or_email_validation} />
                            <Input {...password_validation} />
                            <button disabled={authing} onClick={onSubmit}>
                                Log in!
                            </button>
                        </form>
                    </FormProvider>

                    <Link to="/signup">need an account?</Link>
                </div>
            </div>
        </>
    );
}
