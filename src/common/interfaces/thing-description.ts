import { ThingDescription as ThingDescriptionReference } from 'wot-thing-description-types';

export type ThingDescription = ThingDescriptionReference;

export type AnonymousThingDescription = Omit<ThingDescription, 'id'>;

export interface EnrichedThingDescription extends ThingDescription {
  registration: RegistrationInformation;
}

export interface RegistrationInformation {
  created?: string;
  modified?: string;
  expires?: string;
  ttl?: number;
  retrieved?: string;
}
