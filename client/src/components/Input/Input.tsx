import findInputError from "../../utils/findInputError";
import { isFormInvalid } from "../../utils/isFormInvalid";
import { useFormContext } from "react-hook-form";
import styles from "./Input.module.css";

type InputPropTypes = {
	label: string;
	type: string;
	id: string;
	placeholder: string;
	validation: Object;
	name: string;
};

type ErrorType = {
	message: string;
};
type InputErrorType = {
	error?: ErrorType;
};

export default function Input({
	label,
	type,
	id,
	placeholder,
	validation,
	name,
}: InputPropTypes) {
	const {
		register,
		formState: { errors },
	} = useFormContext();
	// console.log(errors, name, validation);
	const inputError: InputErrorType = findInputError(errors, name);
	const isInvalid = isFormInvalid(inputError);

	return (
		<div className={styles.input}>
			{isInvalid && (
				<InputError
					message={inputError.error!.message}
					key={inputError.error!.message}
				/>
			)}
			<label htmlFor={id}>{label}</label>
			<input
				id={id}
				type={type}
				placeholder={placeholder}
				{...register(name, validation)}
			/>
		</div>
	);
}

const InputError = ({ message }: { message: string }) => {
	return <p>{message}</p>;
};
