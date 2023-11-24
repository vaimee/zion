import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

import { getEnvFilePath } from '../common/utils';
import { ConfigService } from './config.service';
import configuration from './configuration';
import { validationSchema } from './env.validation';

@Module({
  imports: [
    NestConfigModule.forRoot({
      envFilePath: getEnvFilePath(process.cwd()),
      load: [configuration],
      validationSchema,
    }),
  ],
  exports: [ConfigService],
  providers: [ConfigService],
})
export class ConfigModule {}
