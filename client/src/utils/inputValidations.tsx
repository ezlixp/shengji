export const username_or_email_validation = {
    name: "username",
    label: "username or email",
    type: "text",
    id: "username",
    placeholder: "username or email",
    validation: {
        required: "required",
    },
};

export const username_validation = {
    name: "username",
    label: "username",
    type: "text",
    id: "username",
    placeholder: "username",
    validation: {
        required: {
            value: true,
            message: "required",
        },
        minLength: {
            value: 3,
            message: "username must be at least 3 characters",
        },
        maxLength: {
            value: 20,
            message: "username may not exceed 20 characters",
        },
        pattern: {
            value: /^[a-zA-Z0-9]+$/,
            message: "not a valid username",
        },
    },
};

export const email_validation = {
    name: "email",
    label: "email address",
    type: "text",
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
