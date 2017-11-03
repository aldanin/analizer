import Validator from './validator';

class StringValidator extends Validator {
    validate(value: string, path: string) {
        if (typeof value !== 'string') {
            this.handleValidatorError(`${path} is not of type string`);
        }

        return value;
    }
}

export default StringValidator;