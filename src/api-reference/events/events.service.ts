import { Injectable, MessageEvent } from '@nestjs/common';
import { Observable, Subject, concat, filter, map } from 'rxjs';

import { NotFoundException } from './../../common/exceptions';
import { EventType, TDLifeCycleEvent } from '../../common/models/events';
import { ThingDescription } from '../../common/models/thing-description';
import { TDLifeCycleEventRepository } from '../../persistence/events.repository';

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

  public constructor(private readonly eventsRepository: TDLifeCycleEventRepository) {
    this.thingLifeCycle = new Subject<TDLifeCycleEvent>();
  }
  public async subscribeToAll(diff: boolean, lastEvent?: string): Promise<Observable<MessageEvent>> {
    if (lastEvent) {
      const obs = await this.createObservableForPastEvents(diff, parseInt(lastEvent));
      return concat(obs, this.thingLifeCycle.pipe(mapEventsWithDiff(diff)));
    }
    return this.thingLifeCycle.pipe(mapEventsWithDiff(diff));
  }

  public async subscribeTo(type: EventType, diff: boolean, lastEvent?: string): Promise<Observable<MessageEvent>> {
    if (![EventType.THING_DELETED, EventType.THING_UPDATED, EventType.THING_CREATED].includes(type)) {
      throw new NotFoundException(`Cannot subscribe to event type ${type}, because is not found`);
    }

    if (lastEvent) {
      const obs = await this.createObservableForPastEvents(diff, parseInt(lastEvent), type);
      return concat(
        obs.pipe(),
        this.thingLifeCycle.pipe(filter((event) => event.type === type)).pipe(mapEventsWithDiff(diff)),
      );
    }
    return this.thingLifeCycle.pipe(filter((event) => event.type === type)).pipe(mapEventsWithDiff(diff));
  }

  public async emitCreated(td: ThingDescription) {
    const event = await this.eventsRepository.create({ type: EventType.THING_CREATED, td });
    this.thingLifeCycle.next(event);
  }
  public async emitUpdated(td: Partial<ThingDescription>) {
    const event = await this.eventsRepository.create({ type: EventType.THING_UPDATED, td });
    this.thingLifeCycle.next(event);
  }
  public async emitDeleted(id: ThingDescription['id']) {
    const event = await this.eventsRepository.create({ type: EventType.THING_DELETED, td: { id } });
    this.thingLifeCycle.next(event);
  }

  private async createObservableForPastEvents(
    diff: boolean,
    id: number,
    type?: EventType,
  ): Promise<Observable<MessageEvent>> {
    const missedEvents = await this.eventsRepository.findAfter(id);
    const obs = new Observable<TDLifeCycleEvent>((subscriber) => {
      missedEvents.forEach((event) => subscriber.next(event));
    });

    if (type) {
      return obs.pipe(filter((event) => event.type === type)).pipe(mapEventsWithDiff(diff));
    }

    return obs.pipe(mapEventsWithDiff(diff));
  }
}
