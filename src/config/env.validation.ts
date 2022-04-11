import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string(),
  SERVER_PORT: Joi.number(),
});
