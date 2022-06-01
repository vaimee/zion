import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService {
  public constructor(private readonly nestConfigService: NestConfigService) {}

  public get version(): string {
    return process.env.npm_package_version || '';
  }

  public get apiBase(): string {
    return this.nestConfigService.get<string>('API_BASE', 'http://localhost:3000');
  }

  public get serverHost(): string {
    return this.nestConfigService.get('SERVER_HOST', '0.0.0.0');
  }

  public get serverPort(): number {
    return this.nestConfigService.get('SERVER_PORT', 3000);
  }

  public get dbHost(): string {
    return this.nestConfigService.get('DB_HOST', 'localhost');
  }

  public get dbPort(): number {
    return this.nestConfigService.get('DB_PORT', 5432);
  }

  public get dbUser(): string {
    return this.nestConfigService.get('DB_USER', 'postgres');
  }

  public get dbPassword(): string {
    return this.nestConfigService.get('DB_PASSWORD', 'postgres');
  }

  public get dbDatabase(): string {
    return this.nestConfigService.get('DB_DATABASE', 'postgres');
  }

  public get advertisedTDPath(): string {
    return this.nestConfigService.get('MDNS_TD_PATH', '/well-known/wot-thing-description');
  }

  public get multicastName(): string {
    return this.nestConfigService.get('MDNS_NAME', 'zion');
  }
}
