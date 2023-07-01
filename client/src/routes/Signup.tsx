import { useState } from "react";
import { useAuth } from "../contexts/authContext";
import { Link, useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import Input from "../components/Input/Input";
import {
	confirm_password_validation,
	email_validation,
	password_validation,
} from "../utils/inputValidations";
import axios from "axios";

export default function SignUp() {
	const methods = useForm();
	const [email, setEmail] = useState<string | null>();
	const [password, setPassword] = useState<string | null>();
	const { currentUser, signup } = useAuth();
	const [error, setError] = useState<string | null>();
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	async function createUser() {
		try {
			setError("");
			setLoading(true);
			console.log(email + " " + password);
			await signup(email, password)
				.then(
					await axios.post("http://localhost:3000/createUser", {
						uid: currentUser!.uid,
						elo: 0,
					})
				)
				.then(navigate("/"));
		} catch {
			setError("Failed to create an account");
		}
		setLoading(false);
	}

	const handleSubmit = methods.handleSubmit((data) => {
		console.log(data);
		methods.reset();
		console.log(data.email + " " + data.password);
		setEmail(data.email);
		setPassword(data.password);
		createUser();
	});

	return (
		<>
			{error && error}
			<FormProvider {...methods}>
				<form onSubmit={(e) => e.preventDefault()} noValidate>
					<Input {...email_validation} />
					<Input {...password_validation} />
					<Input
						{...confirm_password_validation(
							methods.getValues("password")
						)}
					/>
					<button disabled={loading} onClick={handleSubmit}>
						Sign up!
					</button>
					<Link to="/login">already have an account?</Link>
				</form>
			</FormProvider>
		</>
	);
}
