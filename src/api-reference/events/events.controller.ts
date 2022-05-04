import { Controller, Param, Query, Sse } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { ThingDescription } from 'wot-thing-description-types';

import { EventType, EventsAPI } from './events.interface';
import { EventsService } from './events.service';

@ApiTags('Events')
@Controller('events')
export class EventsController implements EventsAPI {
  public constructor(private readonly eventsService: EventsService) {}

  @Sse()
  public subscribeToAll(@Query() diff: boolean): Observable<Partial<ThingDescription>> {
    throw new Error('Method not implemented.');
  }

  @Sse(':type')
  public subscribeTo(@Param('type') type: EventType, @Query() diff: boolean): Observable<Partial<ThingDescription>> {
    throw new Error('Method not implemented.');
  }
}
