import { Module } from '@nestjs/common';

import { PersistenceModule } from './../../persistence/persistence.module';
import { ThingsController } from './things.controller';
import { ThingsService } from './things.service';

@Module({
  imports: [PersistenceModule],
  controllers: [ThingsController],
  providers: [ThingsService],
})
export class ThingsModule {}
