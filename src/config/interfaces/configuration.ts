import { AppConfig, AuthConfig, DatabaseConfig, IntroductionConfig, ThingDescriptionEventsConfig } from '.';

export interface Configuration {
  auth: AuthConfig;
  app: AppConfig;
  introduction: IntroductionConfig;
  db: DatabaseConfig;
  thingDescriptionEvents: ThingDescriptionEventsConfig;
}
