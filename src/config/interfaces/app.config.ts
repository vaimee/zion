import * as Joi from 'joi';

export const AppConfigValidationSchema = Joi.object({
  host: Joi.string().default('0.0.0.0'),
  port: Joi.number().default(3000),
  apiBase: Joi.string().uri().default('http://localhost:3000'),
  version: Joi.string().default('development'),
});

export type AppConfig = Joi.extractType<typeof AppConfigValidationSchema>;
export type AppConfigWithDefaults = Required<AppConfig>;
