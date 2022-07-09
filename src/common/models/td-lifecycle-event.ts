import { ThingDescription } from '../interfaces/thing-description';
import { Model } from './model';

export enum EventType {
  THING_CREATED = 'thing_created',
  THING_UPDATED = 'thing_updated',
  THING_DELETED = 'thing_deleted',
}

export class TDLifecycleEvent extends Model {
  public type: EventType;
  public td: Partial<ThingDescription>;

  public constructor({ id, type, td }: TDLifecycleEvent) {
    super();
    this.id = id;
    this.type = type;
    this.td = td;
  }
}
