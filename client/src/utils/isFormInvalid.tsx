type InputErrorType = {
    error?: ErrorType;
};
type ErrorType = {
    message: string;
};
export const isFormInvalid = (err: InputErrorType) => {
    if (Object.keys(err).length > 0) return true;
    return false;
};
