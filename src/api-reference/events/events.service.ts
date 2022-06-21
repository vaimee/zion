import { Injectable, MessageEvent } from '@nestjs/common';
import { Observable, Subject, filter, map } from 'rxjs';

import { EventType, TDLifeCycleEvent } from '../../common/models/events';
import { ThingDescription } from '../../common/models/thing-description';

function mapEventsWithDiff(diff: boolean) {
  return map((event: TDLifeCycleEvent): MessageEvent => {
    if (!diff) {
      return { id: `${event.id}`, type: event.type, data: { id: event.td.id } };
    }
    return { id: `${event.id}`, type: event.type, data: event.td };
  });
}

@Injectable()
export class EventsService {
  private thingLifeCycle: Subject<TDLifeCycleEvent>;

  public constructor() {
    this.thingLifeCycle = new Subject<TDLifeCycleEvent>();
  }
  public subscribeToAll(diff: boolean): Observable<MessageEvent> {
    const s = this.thingLifeCycle.pipe(mapEventsWithDiff(diff));
    return s;
  }

  public subscribeTo(type: EventType, diff: boolean): Observable<MessageEvent> {
    return this.thingLifeCycle.pipe(filter((event) => event.type === type)).pipe(mapEventsWithDiff(diff));
  }

  public emitCreated(td: ThingDescription) {
    this.thingLifeCycle.next({ id: 1, type: EventType.THING_CREATED, td });
  }
  public emitUpdated(td: Partial<ThingDescription>) {
    this.thingLifeCycle.next({ id: 1, type: EventType.THING_UPDATED, td });
  }
  public emitDeleted(id: ThingDescription['id']) {
    this.thingLifeCycle.next({ id: 1, type: EventType.THING_DELETED, td: { id } });
  }
}
