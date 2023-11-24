import * as Joi from 'joi';

export const AuthConfigValidationSchema = Joi.object({
  jwt: Joi.object({
    secret: Joi.string().required(),
    expiresIn: Joi.string().default('1d'),
  }),
});

export type AuthConfig = Joi.extractType<typeof AuthConfigValidationSchema>;
export type AuthConfigWithDefaults = Required<AuthConfig>;
