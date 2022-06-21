import { Model } from './model';
import { ThingDescription } from './thing-description';

export enum EventType {
  THING_CREATED = 'thing_created',
  THING_UPDATED = 'thing_updated',
  THING_DELETED = 'thing_deleted',
}

export class TDLifeCycleEvent extends Model {
  public type: EventType;
  public td: ThingDescription;

  public constructor({ id, type, td }: TDLifeCycleEvent) {
    super();
    this.id = id;
    this.type = type;
    this.td = td;
  }
}
