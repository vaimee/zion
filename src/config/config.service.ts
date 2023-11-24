import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

import Default from './default';
import {
  AppConfig,
  AppConfigWithDefaults,
  AuthConfig,
  AuthConfigWithDefaults,
  Configuration,
  DatabaseConfig,
  IntroductionConfig,
  IntroductionConfigWithDefaults,
  ThingDescriptionEventsConfig,
  ThingDescriptionEventsConfigWithDefaults,
} from './interfaces';

@Injectable()
export class ConfigService {
  public constructor(private readonly nestConfigService: NestConfigService<Configuration>) {}

  public get database(): DatabaseConfig {
    return this.nestConfigService.get('db', Default.db);
  }

  public get app(): AppConfigWithDefaults {
    return this.nestConfigService.get('app', Default.app);
  }

  public get auth(): AuthConfigWithDefaults {
    return this.nestConfigService.get('auth', Default.auth);
  }

  public get introduction(): IntroductionConfigWithDefaults {
    return this.nestConfigService.get('introduction', Default.introduction);
  }

  public get thingDescriptionEvents(): ThingDescriptionEventsConfigWithDefaults {
    return this.nestConfigService.get('thingDescriptionEvents', Default.thingDescriptionEvents);
  }
}
