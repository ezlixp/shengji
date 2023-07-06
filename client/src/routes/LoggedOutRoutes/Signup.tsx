import { useState } from "react";
import { useAuth } from "../../contexts/authContext";
import { Link, useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import Input from "../../components/Input/Input";
import {
	confirm_password_validation,
	email_validation,
	password_validation,
} from "../../utils/inputValidations";
import axios from "axios";

export default function SignUp() {
	const methods = useForm();
	const { currentUser, signup } = useAuth();
	const [error, setError] = useState<string | null>();
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	async function createUser(email: string, password: string) {
		try {
			setError("");
			setLoading(true);
			// console.log(email + " " + password);
			await signup(email, password);
			await axios.post(
				`${import.meta.env.VITE_REACT_APP_BASE_URL}createUser`,
				{
					uid: currentUser!.uid,
					elo: 0,
				}
			);
			navigate("/");
		} catch (error) {
			setError(`Failed to create an account with error ${error}`);
		}
		setLoading(false);
	}

	const getPasswordValue = () => {
		return methods.getValues("password");
	};

	const handleSubmit = methods.handleSubmit((data) => {
		// console.log(data);
		methods.reset();
		// console.log(data.email + " " + data.password);
		createUser(data.email, data.password);
	});

	return (
		<>
			{error && error}
			<FormProvider {...methods}>
				<form onSubmit={(e) => e.preventDefault()} noValidate>
					<Input {...email_validation} />
					<Input {...password_validation} />
					<Input {...confirm_password_validation(getPasswordValue)} />
					<button disabled={loading} onClick={handleSubmit}>
						Sign up!
					</button>
					<Link to="/login">already have an account?</Link>
				</form>
			</FormProvider>
		</>
	);
}
