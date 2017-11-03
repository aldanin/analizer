import Validator from './validator';

class NumberValidator extends Validator{
    validate(value: number, path: string) {
        if (typeof value !== 'number') {
            this.handleValidatorError(`${path} is not of type number`);
        }

        return value;
    }
}

export default NumberValidator;