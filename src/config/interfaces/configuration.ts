import * as Joi from 'joi';

import { AppConfigValidationSchema, AppConfigWithDefaults } from './app.config';
import { AuthConfigValidationSchema, AuthConfigWithDefaults } from './auth.config';
import { DatabaseConfigValidationSchema, DatabaseConfigWithDefaults } from './database.config';
import { IntroductionConfigValidationSchema, IntroductionConfigWithDefaults } from './introduction.config';
import {
  ThingDescriptionEventsConfigValidationSchema,
  ThingDescriptionEventsConfigWithDefaults,
} from './thing-description-events.config';

export interface Configuration {
  auth: AuthConfigWithDefaults;
  app: AppConfigWithDefaults;
  introduction: IntroductionConfigWithDefaults;
  db: DatabaseConfigWithDefaults;
  thingDescriptionEvents: ThingDescriptionEventsConfigWithDefaults;
}

export const ConfigurationValidationSchema = Joi.object<Configuration>({
  app: AppConfigValidationSchema,
  auth: AuthConfigValidationSchema,
  db: DatabaseConfigValidationSchema,
  introduction: IntroductionConfigValidationSchema,
  thingDescriptionEvents: ThingDescriptionEventsConfigValidationSchema,
});
