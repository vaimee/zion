import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

import Default from './default';
import { AppConfig, AuthConfig, DatabaseConfig, IntroductionConfig, ThingDescriptionEventsConfig } from './interfaces';

@Injectable()
export class ConfigService {
  public constructor(private readonly nestConfigService: NestConfigService) {}

  public get database(): DatabaseConfig {
    const databaseConfig: DatabaseConfig = {
      host: this.nestConfigService.get('ZION_DB_HOST', Default.db.host),
      port: this.nestConfigService.get('ZION_DB_PORT', Default.db.port),
      user: this.nestConfigService.get('ZION_DB_USER', Default.db.user),
      password: this.nestConfigService.get('ZION_DB_PASSWORD', Default.db.password),
      database: this.nestConfigService.get('ZION_DB_DATABASE', Default.db.database),
    };
    return databaseConfig;
  }

  public get app(): AppConfig {
    const appConfig: AppConfig = {
      host: this.nestConfigService.get('ZION_APP_HOST', Default.app.host),
      port: this.nestConfigService.get('ZION_APP_PORT', Default.app.port),
      apiBase: this.nestConfigService.get('ZION_API_BASE', Default.app.apiBase),
      version: process.env.npm_package_version || '',
    };
    return appConfig;
  }

  public get auth(): AuthConfig {
    const authConfig: AuthConfig = {
      jwt: {
        secret: this.nestConfigService.get('ZION_JWT_SECRET', Default.auth.jwt.secret),
        expiresIn: this.nestConfigService.get('ZION_JWT_EXPIRES_IN', Default.auth.jwt.expiresIn),
      },
    };
    return authConfig;
  }

  public get introduction(): IntroductionConfig {
    const introductionConfig: IntroductionConfig = {
      mdns: {
        name: this.nestConfigService.get('ZION_MDNS_TO_PATH', Default.introduction.mdns.toPath),
        toPath: this.nestConfigService.get('ZION_MDNS_NAME', Default.introduction.mdns.name),
      },
    };
    return introductionConfig;
  }

  public get thingDescriptionEvents(): ThingDescriptionEventsConfig {
    const thingDescriptionEventsConfig: ThingDescriptionEventsConfig = {
      maxEvents: this.nestConfigService.get('ZION_MAX_EVENTS', Default.thingDescriptionEvents.maxEvents),
    };
    return thingDescriptionEventsConfig;
  }
}
