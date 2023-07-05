import findInputError from "../../utils/findInputError";
import { isFormInvalid } from "../../utils/isFormInvalid";
import { useFormContext } from "react-hook-form";

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
	const inputError: InputErrorType = findInputError(errors, label);
	const isInvalid = isFormInvalid(inputError);

	return (
		<>
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
		</>
	);
}

const InputError = ({ message }: { message: string }) => {
	return <p>{message}</p>;
};
