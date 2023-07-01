import { FieldErrors } from "../types/formTypes";

export default function findInputError(errors: FieldErrors, name: string) {
	const filtered = Object.keys(errors)
		.filter((key) => key === name)
		.reduce((cur, key) => {
			return Object.assign(cur, { error: errors[key] });
		}, {});
	return filtered;
}
