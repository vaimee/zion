import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

import { ThingDescription } from './../../common/models/thing-description.model';
import { EventType } from './enums/event-type';

@Injectable()
export class EventsService {
  public subscribeToAll(diff: boolean): Observable<Partial<ThingDescription>> {
    throw new Error('Method not implemented.');
  }

  public subscribeTo(type: EventType, diff: boolean): Observable<Partial<ThingDescription>> {
    throw new Error('Method not implemented.');
  }
}
