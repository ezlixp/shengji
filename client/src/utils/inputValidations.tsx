export const email_validation = {
	name: "email",
	label: "email address",
	type: "email",
	id: "email",
	placeholder: "email adress",
	validation: {
		required: {
			value: true,
			message: "required",
		},
		pattern: {
			value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			message: "not a valid email",
		},
	},
};
export const password_validation = {
	name: "password",
	label: "password",
	type: "password",
	id: "password",
	placeholder: "type password ...",
	validation: {
		required: {
			value: true,
			message: "required",
		},
		minLength: {
			value: 6,
			message: "min 6 characters",
		},
	},
};
export const confirm_password_validation = (passwordValue: string) => ({
	name: "confirm password",
	label: "confirm password",
	type: "password",
	id: "confirm password",
	placeholder: "confirm password ...",
	validation: {
		required: {
			value: true,
			message: "required",
		},
		validate: {
			value: (v: string) =>
				v === passwordValue || "passwords do not match",
		},
	},
});
