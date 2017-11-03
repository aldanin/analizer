import {expect} from 'chai';

import BooleanValidator from '../validators/boolean-validator';
import NumberValidator from '../validators/number-validator';
import StringValidator from '../validators/string-validator';
import ObjectValidator from '../validators/object-validator';
import OptionalValidator from "../validators/optional-validator";

describe('Boolean Validator', () => {
    it('should validate boolean type', () => {
        let validator = new BooleanValidator();

        // validate type
        expect(validator.validate(true, null)).to.be.a('boolean');
    });

    it('should return validated value', () => {
        let validator = new BooleanValidator();

        // value check
        expect(validator.validate(true, null)).to.equal(true);
        expect(validator.validate(false, null)).to.equal(false);
    });

    it('should throw error on mismatch type', () => {
        let validator = new BooleanValidator();

        expect(validator.validate.bind(validator, 'foo', '/foo/')).to.throw(Error, /\/foo\/ is not of type boolean/);
    });
});

describe('Number Validator', () => {
    it('should validate number type', () => {
        let validator = new NumberValidator();

        // validate type
        expect(validator.validate(42, null)).to.be.a('number');
    });

    it('should return validated value', () => {
        let validator = new NumberValidator();

        // value check
        expect(validator.validate(42, null)).to.equal(42);
        expect(validator.validate(55, null)).to.equal(55);
    });

    it('should throw error on mismatch type', () => {
        let validator = new NumberValidator();

        expect(validator.validate.bind(validator, 'foo', '/foo/')).to.throw(Error, /\/foo\/ is not of type number/);
    });
});

describe('String Validator', () => {
    it('should validate string type', () => {
        let validator = new StringValidator();

        // validate type
        expect(validator.validate('foo', null)).to.be.a('string');
    });

    it('should return validated value', () => {
        let validator = new StringValidator();

        // value check
        expect(validator.validate('foo', null)).to.equal('foo');
        expect(validator.validate('bar', null)).to.equal('bar');
    });

    it('should throw error on mismatch type', () => {
        let validator = new StringValidator();

        expect(validator.validate.bind(validator, 42, '/foo/')).to.throw(Error, /\/foo\/ is not of type string/);
    });
});

describe('Object Validator', () => {
    it('should validate object type', () => {
        let validator = new ObjectValidator({});

        // validate type
        expect(validator.validate({}, null)).to.be.a('object');
    });

    it('should throw error on mismatch type', () => {
        let validator = new ObjectValidator({});

        expect(validator.validate.bind(validator, 42, '/foo/')).to.throw(Error, /\/foo\/ is not of type object/);
    });

    it('should run nested keys validators', () => {
        let expectedKeysTypes = {
            string: new StringValidator(),
            number: new NumberValidator(),
            boolean: new BooleanValidator(),
            object: new ObjectValidator({foo: new StringValidator})
        };

        let validator = new ObjectValidator(expectedKeysTypes);
        let validatedObject = <any> validator.validate({
            string: 'string',
            number: 42,
            boolean: true,
            object: {foo: 'a string'}
        });

        expect(validatedObject.string).to.equal('string').and.to.be.a('string');
        expect(validatedObject.number).to.equal(42).and.to.be.a('number');
        expect(validatedObject.boolean).to.equal(true).and.to.be.a('boolean');
        // equal an object is not a very clever idea
        expect(validatedObject.object).to.be.a('object');
    });

    it('should throw error on nested keys validators mismatch', () => {
        let expectedKeysTypes = {
            string: new StringValidator()
        };

        let validator = new ObjectValidator(expectedKeysTypes);

        let validateFn = <any> validator.validate.bind(validator, {string: 42}, 'foo');

        expect(validateFn).to.throw(Error, /foo\/string is not of type string/);
    });
});

describe('Optional Validator', () => {
    it('Should return null on empty value', () => {
        let validator = new OptionalValidator(new StringValidator());

        expect(validator.validate(null, '')).to.equal(null);
    });

    it('Should validate if value exists', () => {
        let validator = new OptionalValidator(new StringValidator());

        expect(validator.validate('foo', '')).to.equal('foo').and.to.be.a('string');
    });
});