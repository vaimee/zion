import { Module } from '@nestjs/common';

import { ApiReferenceModule } from './api-reference/api-reference.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { IntroductionModule } from './introduction/introduction.module';
import { PersistenceModule } from './persistence/persistence.module';

@Module({
  imports: [ConfigModule, PersistenceModule, IntroductionModule, AuthModule, ApiReferenceModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
