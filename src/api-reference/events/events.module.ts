import { Module } from '@nestjs/common';

import { PersistenceModule } from '../../persistence/persistence.module';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';

@Module({
  imports: [PersistenceModule],
  controllers: [EventsController],
  providers: [EventsService],
  exports: [EventsService],
})
export class EventsModule {}
