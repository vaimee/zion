import {
  ThingContext,
  ThingContextTdUriTemp,
  ThingContextTdUriV1,
  ThingContextTdUriV11,
} from 'wot-thing-description-types';

import { ENRICHED_TD_CONTEXT } from '../constants';
import { EnrichedThingDescription, ThingDescription } from '../interfaces/thing-description';
import { InternalThingDescription } from '../models';

export function isAnonymousThingDescription(thingDescription: ThingDescription): boolean {
  return !!thingDescription.id;
}

export function deanonymizeThingDescriptions(
  internalThingDescriptions: InternalThingDescription[],
): ThingDescription[] {
  return internalThingDescriptions.map((internalThingDescription) => {
    return deanonymizeThingDescription(internalThingDescription);
  });
}

export function deanonymizeThingDescription(internalThingDescription: InternalThingDescription): ThingDescription {
  const thingDescription = internalThingDescription.json;
  if (!thingDescription.id) thingDescription.id = internalThingDescription.urn;
  return thingDescription;
}

export function enrichThingDescriptions(
  internalThingDescriptions: InternalThingDescription[],
): EnrichedThingDescription[] {
  return internalThingDescriptions.map((internalThingDescription) => {
    return enrichThingDescription(internalThingDescription);
  });
}

export function enrichThingDescription(internalThingDescription: InternalThingDescription): EnrichedThingDescription {
  const thingDescription = deanonymizeThingDescription(internalThingDescription);
  thingDescription['@context'] = enrichThingDescriptionContext(thingDescription['@context']);
  return {
    ...thingDescription,
    registration: {
      created: internalThingDescription.created,
      modified: internalThingDescription.modified,
      expires: internalThingDescription.expires,
      ttl: internalThingDescription.ttl,
      retrieved: new Date().toISOString(),
    },
  };
}

type ThingContextW3CUri = ThingContextTdUriV1 | ThingContextTdUriTemp | ThingContextTdUriV11;

type ThingContextArray = Exclude<ThingContext, [] | ThingContextW3CUri>;
function enrichThingDescriptionContext(context: ThingContext): ThingContext {
  const enrichedContext = (Array.isArray(context) ? context : [context]) as ThingContextArray;
  enrichedContext.push(ENRICHED_TD_CONTEXT);
  return enrichedContext;
}
