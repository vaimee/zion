import { Module } from '@nestjs/common';

import { ApiReferenceModule } from './api-reference/api-reference.module';
import { CommonModule } from './common/common.module';
import { ConfigModule } from './config/config.module';
import { PersistenceModule } from './persistence/persistence.module';

@Module({
  imports: [ConfigModule, CommonModule, PersistenceModule, ApiReferenceModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
