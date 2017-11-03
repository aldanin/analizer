const AUTHENTICATION_ERROR = 'validationError';

class AuthenticationError extends Error {
    public type: string = AUTHENTICATION_ERROR;

    constructor(message: string) {
        super(message);
    }
}

export default AUTHENTICATION_ERROR;