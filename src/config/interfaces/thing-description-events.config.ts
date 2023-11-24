import * as Joi from 'joi';

export const ThingDescriptionEventsConfigValidationSchema = Joi.object({
  maxEvents: Joi.number().integer().min(0),
});

export type ThingDescriptionEventsConfig = Joi.extractType<typeof ThingDescriptionEventsConfigValidationSchema>;
export type ThingDescriptionEventsConfigWithDefaults = Required<ThingDescriptionEventsConfig>;
