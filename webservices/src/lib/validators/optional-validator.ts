import Validator from './validator';

class OptionalValidator extends Validator {
    private validator: any;

    constructor(validator: any) {
        super();

        this.validator = validator;
    }

    public validate(value: any, path: string) {
        if (!value) {
            return null;
        }

        return this.validator.validate(value, path);
    }
}

export default OptionalValidator;