const VALIDATION_ERROR = 'validationError';

class ValidationError extends Error {
    public type: string = VALIDATION_ERROR;

    constructor(message: string) {
        super(message);
    }
}

export default ValidationError;