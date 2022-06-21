import { Controller, Headers, MessageEvent, Param, Query, Sse } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';

import { EventType } from '../../common/models/events';
import { EventsService } from './events.service';

@ApiTags('Events')
@Controller('events')
export class EventsController {
  public constructor(private readonly eventsService: EventsService) {}

  @Sse()
  public async subscribeToAll(
    @Query() diff: boolean,
    @Headers('last-event-id') lastEvent?: string,
  ): Promise<Observable<MessageEvent>> {
    return this.eventsService.subscribeToAll(diff, lastEvent);
  }

  @Sse(':type')
  public async subscribeTo(
    @Param('type') type: EventType,
    @Query() diff: boolean,
    @Headers('last-event-id') lastEvent?: string,
  ): Promise<Observable<MessageEvent>> {
    return this.eventsService.subscribeTo(type, diff, lastEvent);
  }
}
