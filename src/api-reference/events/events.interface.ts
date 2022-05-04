import { Observable } from 'rxjs';
import { ThingDescription } from 'wot-thing-description-types';

/**
 * @see https://w3c.github.io/wot-discovery/#exploration-directory-api-notification
 */
export interface EventsAPI {
  subscribeToAll(diff: boolean): Observable<Partial<ThingDescription>>;
  subscribeTo(type: EventType, diff: boolean): Observable<Partial<ThingDescription>>;
}

export enum EventType {
  THING_CREATED = 'thing_created',
  THING_UPDATED = 'thing_updated',
  THING_DELETED = 'thing_deleted',
}
