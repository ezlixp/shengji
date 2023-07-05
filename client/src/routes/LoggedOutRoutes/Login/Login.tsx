import { useState } from "react";
import { useAuth } from "../../../contexts/authContext";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { FormProvider, useForm } from "react-hook-form";
import Input from "../../../components/Input/Input";
import {
	email_validation,
	password_validation,
} from "../../../utils/inputValidations";

export default function Login() {
	const methods = useForm();
	const { login } = useAuth();
	const [error, setError] = useState<string>("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const onSubmit = methods.handleSubmit(async (data) => {
		console.log(data);
		methods.reset();
		console.log(data.email + " " + data.password);
		try {
			setLoading(true);
			setError("");
			await login(data.email, data.password);
			navigate("/");
		} catch {
			setError("Username or password incorrect");
		}
		setLoading(false);
	});
	return (
		<>
			<div className={styles.container}>
				<div className={styles["sign-in-card"]}>
					<h1>Log in</h1>
					{error && error}
					<FormProvider {...methods}>
						<form onSubmit={(e) => e.preventDefault()} noValidate>
							<Input {...email_validation} />
							<Input {...password_validation} />
							<button disabled={loading} onClick={onSubmit}>
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
