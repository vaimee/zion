import { Module } from '@nestjs/common';

import { EventsModule } from './events/events.module';
import { SearchModule } from './search/search.module';
import { ThingsModule } from './things/things.module';

@Module({
  imports: [ThingsModule, EventsModule, SearchModule],
})
export class ApiReferenceModule {}
