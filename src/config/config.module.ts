import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { getEnvFilePath } from 'src/common/utils/env-loader';

import { ConfigService } from './config.service';
import { validationSchema } from './env.validation';

@Module({
  imports: [
    NestConfigModule.forRoot({
      envFilePath: getEnvFilePath(`${process.cwd()}/src/config/env/`),
      validationSchema,
    }),
  ],
  exports: [ConfigService],
  providers: [ConfigService],
})
export class ConfigModule {}
