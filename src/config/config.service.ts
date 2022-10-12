import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

import { Default } from './default.class';

@Injectable()
export class ConfigService {
  public constructor(private readonly nestConfigService: NestConfigService) {}

  public get version(): string {
    return process.env.npm_package_version || '';
  }

  //* why there is apiBase if there are serverHost and serverPort?
  public get apiBase(): string {
    return this.nestConfigService.get<string>('API_BASE', Default.API_BASE);
  }

  public get serverHost(): string {
    return this.nestConfigService.get('SERVER_HOST', Default.SERVER_HOST);
  }

  public get serverPort(): number {
    return this.nestConfigService.get('SERVER_PORT', Default.SERVER_PORT);
  }

  //******************DB CONFS******************//
  public get dbHost(): string {
    return this.nestConfigService.get('DB_HOST', Default.DB_HOST);
  }

  public get dbPort(): number {
    return this.nestConfigService.get('DB_PORT', Default.DB_PORT);
  }

  //* this is a bad name
  public get dbDatabase(): string {
    return this.nestConfigService.get('DB_DATABASE', Default.DB_NAME);
  }

  public get dbUser(): string {
    return this.nestConfigService.get('DB_USER', Default.DB_USER);
  }

  public get dbPassword(): string {
    return this.nestConfigService.get('DB_PASSWORD', Default.DB_PASSWORD);
  }
  //************************* **************************//

  public get maxEvents(): number {
    return this.nestConfigService.get('MAX_EVENTS', Default.MAX_EVENTS);
  }

  //******************JWT CONFS******************//

  public get jwtSecret(): string {
    const jwtSecret = this.nestConfigService.get('JWT_SECRET', Default.MAX_EVENTS);

    console.log(`JWT SECRET: ${jwtSecret}`);
    return jwtSecret;
  }

  public get jwtExpiresIn(): string {
    return this.nestConfigService.get('JWT_EXPIRES_IN', Default.JWT_EXPIRES_IN);
  }
  //**************************** ***********************//

  public get advertisedTDPath(): string {
    return this.nestConfigService.get('MDNS_TD_PATH', Default.MDNS_TO_PATH);
  }

  public get multicastName(): string {
    return this.nestConfigService.get('MDNS_NAME', Default.MDNS_NAME);
  }
}
