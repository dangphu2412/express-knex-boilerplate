import Joi from 'joi';

const MONGOOSE_ID_OBJECT_FORMAT = /^[0-9a-fA-F]{24}$/;

const PHONE_NUMBER_FORMAT = /^[0-9+ ]{10,11}$/;

const DATE_YYYY_MM_DD_FORMAT = /^\d{4}-\d{2}-\d{2}$/;

// Required from 6-30 char, contains special char
const PWD_FORMAT = /^[a-zA-Z0-9\d@$!%*?&]{6,30}$/;

export class JoiUtils {
    static objectId() {
        return Joi.string().regex(MONGOOSE_ID_OBJECT_FORMAT);
    }

    static optionalString() {
        return Joi
            .string()
            .optional();
    }

    static requiredString() {
        return Joi
            .string()
            .trim()
            .required();
    }

    static phoneNumber() {
        return Joi.string().regex(PHONE_NUMBER_FORMAT);
    }

    static email = () => Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } });

    static date() {
        return Joi.string().regex(DATE_YYYY_MM_DD_FORMAT);
    }

    static password() {
        return Joi.string().regex(PWD_FORMAT);
    }

    static optionalStrings() {
        return Joi.array().items(JoiUtils.optionalString()).min(1);
    }
}
