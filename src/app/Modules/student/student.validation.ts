
import Joi from 'joi'
const userNameValidationSchema = Joi.object({
    firstName: Joi.string()
        .trim()
        .required()
        .custom((value, helpers) => {
            const FirstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
            if (value !== FirstNameStr) {
                return helpers.error('any.invalid');
            }
            return value;
        })
        .messages({
            'any.invalid': 'firstName must be capitalized',
            'string.empty': 'firstName is required',
        }),

    middleName: Joi.string().trim().optional(),

    lastName: Joi.string()
        .trim()
        .required()
        .pattern(/^[A-Za-z]+$/)
        .messages({
            'string.pattern.base': 'lastName must contain only letters',
            'string.empty': 'lastName is required',
        }),
});

const guardianValidationSchema = Joi.object({
    fatherName: Joi.string().required(),
    motherName: Joi.string().required(),
    fatherOcupation: Joi.string().required(),
    motherOcupation: Joi.string().required(),
    fatherContactNo: Joi.string().required(),
    motherContactNo: Joi.string().required(),
});

const localGuardianValidationSchema = Joi.object({
    name: Joi.string().required(),
    occupation: Joi.string().required(),
    contactNo: Joi.string().required(),
    address: Joi.string().required(),
});

const studentValidationSchema = Joi.object({
    id: Joi.string().required(),
    name: userNameValidationSchema.required(),

    gender: Joi.string()
        .valid('male', 'female', 'other')
        .required()
        .messages({
            'any.only': 'gender must be male, female, or other',
        }),

    dateOfBirth: Joi.string().optional(),

    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.email': 'Email is not valid',
        }),

    contactNumber: Joi.string().required(),

    bloodGroup: Joi.string()
        .valid('A+', 'A-', 'B+')
        .optional(),

    presentAddress: Joi.string().optional(),
    parmanentAddress: Joi.string().optional(),

    guardian: guardianValidationSchema.required(),
    localGuardian: localGuardianValidationSchema.required(),

    profileImg: Joi.string().optional(),

    isActive: Joi.string()
        .valid('active', 'block')
        .required()
        .messages({
            'any.only': 'isActive must be either active or block',
        }),
});

export default studentValidationSchema;