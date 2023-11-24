import * as Joi from 'joi';

import { AppConfigValidationSchema, ConfigurationValidationSchema } from './interfaces';

const envsValidationSchema = Joi.object();

const stack: [string, Joi.Description][] = [['ZION', ConfigurationValidationSchema.describe()]];
const keysStack = [];
const envPath = [];
console.log('Envs');

while (stack.length) {
  const current = stack.pop();
  envPath.push(current?.[0].toUpperCase());
  if (current?.[1].type === 'object') {
    const entries = Object.entries(current?.[1].keys);
    keysStack.push(entries.length);
    for (const entry of entries) {
      stack.push(entry as [string, Joi.Description]);
    }
  } else {
    keysStack[keysStack.length - 1]--;
    console.log(envPath.join('_'));
    envPath.pop();
    while (keysStack[keysStack.length - 1] === 0) {
      keysStack.pop();
      envPath.pop();
    }
  }
}
console.log('stop');

// TODO: import validation schemas from interfaces
export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'test', 'staging', 'production').default('development'),
  ZION_APP_PORT: AppConfigValidationSchema.extract('port'),
  DB_HOST: Joi.string(),
  DB_PORT: Joi.number(),
  DB_USER: Joi.string(),
  DB_PASSWORD: Joi.string(),
  DB_DATABASE: Joi.string(),
  JWT_SECRET: Joi.string(),
  JWT_EXPIRES_IN: Joi.string(),
});
