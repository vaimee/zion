import { AppConfig, AuthConfig, DatabaseConfig, IntroductionConfig, ThingDescriptionEventsConfig } from '.';

export interface Default {
  auth: AuthConfig;
  app: AppConfig;
  introduction: IntroductionConfig;
  db: DatabaseConfig;
  thingDescriptionEvents: ThingDescriptionEventsConfig;
}
