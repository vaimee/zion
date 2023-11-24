import * as Joi from 'joi';

export const IntroductionConfigValidationSchema = Joi.object({
  mdns: Joi.object({
    name: Joi.string(),
    toPath: Joi.string(),
  }),
});

export type IntroductionConfig = Joi.extractType<typeof IntroductionConfigValidationSchema>;
export type IntroductionConfigWithDefaults = Required<IntroductionConfig>;
