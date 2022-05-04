import { Module } from '@nestjs/common';

import { ApiReferenceModule } from './api-reference/api-reference.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [ConfigModule, ApiReferenceModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
