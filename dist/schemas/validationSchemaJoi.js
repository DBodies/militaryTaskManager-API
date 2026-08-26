import Joi from 'joi';
export const postSchema = Joi.object({
    title: Joi.string()
        .trim()
        .min(3)
        .max(100)
        .required(),
    description: Joi.string()
        .trim()
        .max(1000)
        .required(),
    status: Joi.string()
        .valid('pending', 'in_progress', 'completed', 'cancelled')
        .default('pending'),
    priority: Joi.string()
        .valid('low', 'medium', 'high', 'critical')
        .default('medium'),
    category: Joi.string()
        .valid('general', 'training', 'logistics', 'maintenance', 'operation')
        .default('general'),
    dueDate: Joi.date()
        .iso()
        .required(),
}).unknown(false);
export const patchSchema = Joi.object({
    title: Joi.string()
        .trim()
        .min(3)
        .max(100),
    description: Joi.string()
        .trim()
        .max(1000),
    status: Joi.string()
        .valid('pending', 'in_progress', 'completed', 'cancelled'),
    priority: Joi.string()
        .valid('low', 'medium', 'high', 'critical'),
    category: Joi.string()
        .valid('general', 'training', 'logistics', 'maintenance', 'operation'),
    dueDate: Joi.date()
        .iso(),
}).unknown(false).min(1);
