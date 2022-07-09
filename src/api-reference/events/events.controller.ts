import { Controller, Headers, MessageEvent, Param, Query, Sse } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';

import { EventType } from '../../common/models/td-lifecycle-event';
import { EventsService } from './events.service';
import { ApiSubscribeTo, ApiSubscribeToAll } from './events.swagger';

@ApiTags('Events')
@Controller('events')
export class EventsController {
  public constructor(private readonly eventsService: EventsService) {}

  @Sse()
  @ApiSubscribeToAll()
  public async subscribeToAll(
    @Query() diff: boolean,
    @Headers('Last-Event-ID') lastEvent?: string,
  ): Promise<Observable<MessageEvent>> {
    return this.eventsService.subscribeToAll(diff, lastEvent);
  }

  @Sse(':type')
  @ApiSubscribeTo()
  public async subscribeTo(
    @Param('type') type: EventType,
    @Query() diff: boolean,
    @Headers('Last-Event-ID') lastEvent?: string,
  ): Promise<Observable<MessageEvent>> {
    return this.eventsService.subscribeTo(type, diff, lastEvent);
  }
}
