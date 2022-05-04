import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ThingDescription } from 'wot-thing-description-types';

import { EventType, EventsAPI } from './events.interface';

@Injectable()
export class EventsService implements EventsAPI {
  public subscribeToAll(diff: boolean): Observable<Partial<ThingDescription>> {
    throw new Error('Method not implemented.');
  }

  public subscribeTo(type: EventType, diff: boolean): Observable<Partial<ThingDescription>> {
    throw new Error('Method not implemented.');
  }
}
