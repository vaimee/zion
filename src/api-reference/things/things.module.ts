import { Module } from '@nestjs/common';

import { ConfigModule } from './../../config/config.module';
import { PersistenceModule } from './../../persistence/persistence.module';
import { ThingsController } from './things.controller';
import { ThingsService } from './things.service';

@Module({
  imports: [ConfigModule, PersistenceModule],
  controllers: [ThingsController],
  providers: [ThingsService],
})
export class ThingsModule {}
