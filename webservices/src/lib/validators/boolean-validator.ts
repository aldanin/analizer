import Validator from './validator';

class BooleanValidator extends Validator {
    validate(value: Boolean, path: string) {
        if (typeof value !== 'boolean') {
            this.handleValidatorError(`${path} is not of type boolean`);
        }

        return value;
    }
}

export default BooleanValidator;