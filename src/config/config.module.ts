import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

import { getEnvFilePath } from '../common/utils';
import { ConfigService } from './config.service';
import { validationSchema } from './env.validation';

@Module({
  imports: [
    NestConfigModule.forRoot({
      envFilePath: getEnvFilePath(process.cwd()),
      validationSchema,
    }),
  ],
  exports: [ConfigService],
  providers: [ConfigService],
})
export class ConfigModule {}
