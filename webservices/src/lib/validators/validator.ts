import ValidationError from './validation-error';

class Validator {
    protected handleValidatorError(e: string) {
        throw new ValidationError(e);
    }
}

export default Validator;