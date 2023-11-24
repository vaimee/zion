import * as Joi from 'joi';

export const DatabaseConfigValidationSchema = Joi.object({
  host: Joi.string().uri(),
  port: Joi.number().integer().min(0).max(9999),
  user: Joi.string(),
  password: Joi.string(),
  database: Joi.string(),
});

export type DatabaseConfig = Joi.extractType<typeof DatabaseConfigValidationSchema>;
export type DatabaseConfigWithDefaults = Required<DatabaseConfig>;
