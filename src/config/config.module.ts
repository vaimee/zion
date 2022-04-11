import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

import { ConfigService } from './config.service';
import { validationSchema } from './env.validation';

@Module({
  imports: [
    NestConfigModule.forRoot({
      validationSchema,
    }),
  ],
  exports: [ConfigService],
  providers: [ConfigService],
})
export class ConfigModule {}
