import { Controller, MessageEvent, Param, Query, Sse } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';

import { EventType } from '../../common/models/events';
import { EventsService } from './events.service';

@ApiTags('Events')
@Controller('events')
export class EventsController {
  public constructor(private readonly eventsService: EventsService) {}

  @Sse()
  public subscribeToAll(@Query() diff: boolean): Observable<MessageEvent> {
    return this.eventsService.subscribeToAll(diff);
  }

  @Sse(':type')
  public subscribeTo(@Param('type') type: EventType, @Query() diff: boolean): Observable<MessageEvent> {
    return this.eventsService.subscribeTo(type, diff);
  }
}
