import Validator from './validator';

import OptionalValidator from './optional-validator';

class ObjectValidator extends Validator implements ObjectValidator {
    private expected: Object;

    constructor(expected: Object) {
        super();

        this.expected = expected;
    }

    public pushExpected(key: string, validator: any) {
        this.expected[key] = validator;
    }

    public validate(value: Object, path?: string) {
        path = path ? path : '/';

        if (typeof value !== 'object') {
            this.handleValidatorError(`${path} is not of type object`);
        }

        let result = {};

        if (!Object.keys(this.expected).length || !value) {
            return result;
        }

        for (let key in this.expected) {
            let fullPath = `${path ? path : ''}/${key}`;

            if (!value.hasOwnProperty(key)) {
                this.handleValidatorError(`expected key ${key} doesn't exist in path: ${fullPath}`);
            }

            let validatedInnerValue = this.expected[key].validate(value[key], fullPath);

            if (this.expected[key] instanceof OptionalValidator && validatedInnerValue === null) {
                continue;
            }

            result[key] = validatedInnerValue;
        }

        return result;
    }
}

export default ObjectValidator;