import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

import { Default } from './default.namespace';
import { AppConfig, DatabaseConfig, IntroductionConfig, ThingDescriptionEventsConfig } from './interfaces';
import { AuthConfig } from './interfaces/authConfig';

@Injectable()
export class ConfigService {
  public constructor(private readonly nestConfigService: NestConfigService) {}

  public get database(): DatabaseConfig {
    const databaseConfig: DatabaseConfig = {
      host: this.nestConfigService.get('DB_HOST', Default.DB.HOST),
      port: this.nestConfigService.get('DB_PORT', Default.DB.PORT),
      type: this.nestConfigService.get('DB_TYPE', Default.DB.TYPE),
      user: this.nestConfigService.get('DB_USER', Default.DB.USER),
      password: this.nestConfigService.get('DB_PASSWORD', Default.DB.PASSWORD),
    };
    return databaseConfig;
  }

  public get app(): AppConfig {
    const appConfig: AppConfig = {
      host: this.nestConfigService.get('APP_HOST', Default.App.HOST),
      port: this.nestConfigService.get('APP_PORT', Default.App.PORT),
      apiBase: this.nestConfigService.get('API_BASE', Default.App.API_BASE),
      version: process.env.npm_package_version || '',
    };
    return appConfig;
  }

  public get auth(): AuthConfig {
    const authConfig: AuthConfig = {
      jwt: {
        secret: this.nestConfigService.get('JWT_SECRET', Default.Jwt.SECRET),
        expiresIn: this.nestConfigService.get('JWT_EXPIRES_IN', Default.Jwt.EXPIRES_IN),
      },
    };
    return authConfig;
  }

  public get introduction(): IntroductionConfig {
    const introductionConfig: IntroductionConfig = {
      mdns: {
        name: this.nestConfigService.get('MDNS_TO_PATH', Default.MDNS.TO_PATH),
        toPath: this.nestConfigService.get('MDNS_NAME', Default.MDNS.NAME),
      },
    };
    return introductionConfig;
  }

  public get thingDescriptionEvents(): ThingDescriptionEventsConfig {
    const thingDescriptionEventsConfig: ThingDescriptionEventsConfig = {
      maxEvents: this.nestConfigService.get('MAX_EVENTS', Default.TDLifecycleEvent.MAX_EVENTS),
    };
    return thingDescriptionEventsConfig;
  }
}
