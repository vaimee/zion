import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

import Default from './default';
import { AppConfig, DatabaseConfig, IntroductionConfig, ThingDescriptionEventsConfig } from './interfaces';
import { AuthConfig } from './interfaces/authConfig';

@Injectable()
export class ConfigService {
  public constructor(private readonly nestConfigService: NestConfigService) {}

  public get database(): DatabaseConfig {
    const databaseConfig: DatabaseConfig = {
      host: this.nestConfigService.get('DB_HOST', Default.db.host),
      port: this.nestConfigService.get('DB_PORT', Default.db.port),
      type: this.nestConfigService.get('DB_TYPE', Default.db.type),
      user: this.nestConfigService.get('DB_USER', Default.db.user),
      password: this.nestConfigService.get('DB_PASSWORD', Default.db.password),
    };
    return databaseConfig;
  }

  public get app(): AppConfig {
    const appConfig: AppConfig = {
      host: this.nestConfigService.get('APP_HOST', Default.app.host),
      port: this.nestConfigService.get('APP_PORT', Default.app.port),
      apiBase: this.nestConfigService.get('API_BASE', Default.app.apiBase),
      version: process.env.npm_package_version || '',
    };
    return appConfig;
  }

  public get auth(): AuthConfig {
    const authConfig: AuthConfig = {
      jwt: {
        secret: this.nestConfigService.get('JWT_SECRET', Default.auth.jwt.secret),
        expiresIn: this.nestConfigService.get('JWT_EXPIRES_IN', Default.auth.jwt.expiresIn),
      },
    };
    return authConfig;
  }

  public get introduction(): IntroductionConfig {
    const introductionConfig: IntroductionConfig = {
      mdns: {
        name: this.nestConfigService.get('MDNS_TO_PATH', Default.introduction.mdns.toPath),
        toPath: this.nestConfigService.get('MDNS_NAME', Default.introduction.mdns.name),
      },
    };
    return introductionConfig;
  }

  public get thingDescriptionEvents(): ThingDescriptionEventsConfig {
    const thingDescriptionEventsConfig: ThingDescriptionEventsConfig = {
      maxEvents: this.nestConfigService.get('MAX_EVENTS', Default.thingDescriptionEvents.maxEvents),
    };
    return thingDescriptionEventsConfig;
  }
}
