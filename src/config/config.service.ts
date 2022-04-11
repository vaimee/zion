import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService {
  public constructor(private readonly nestConfigService: NestConfigService) {}

  public get version(): string {
    return process.env.npm_package_version || '';
  }

  public get serverPort(): number {
    return this.nestConfigService.get('SERVER_PORT', 3000);
  }
}
