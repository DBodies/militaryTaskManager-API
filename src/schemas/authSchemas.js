import Joi from 'joi';

export const registerSchema = Joi.object({
name: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .required()
    .messages({
    'any.required': 'Name is required',
    'string.empty': 'Name cannot be empty',
    'string.base': 'Name must be a string',
    'string.min': 'Name must contain at least 2 characters',
    'string.max': 'Name must contain no more than 50 characters',
    }),
email: Joi.string()
    .trim()
    .lowercase()
    .email()
    .required()
    .messages({
    'any.required': 'Email is required',
    'string.empty': 'Email cannot be empty',
    'string.base': 'Email must be a string',
    'string.email': 'Email must be a valid email address',
    }),
password: Joi.string()
    .min(8)
    .max(64)
    .required()
    .messages({
    'any.required': 'Password is required',
    'string.empty': 'Password cannot be empty',
    'string.base': 'Password must be a string',
    'string.min': 'Password must contain at least 8 characters',
    'string.max': 'Password must contain no more than 64 characters',
    }),
}).unknown(false)

export const loginSchema = Joi.object({
email: Joi.string()
    .trim()
    .lowercase()
    .email()
    .required()
    .messages({
    'any.required': 'Email is required',
    'string.empty': 'Email cannot be empty',
    'string.base': 'Email must be a string',
    'string.email': 'Email must be a valid email address',
    }),
password: Joi.string()
    .required()
    .messages({
    'any.required': 'Password is required',
    'string.empty': 'Password cannot be empty',
    'string.base': 'Password must be a string',
    }),
}).unknown(false)