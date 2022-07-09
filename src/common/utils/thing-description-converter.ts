import { ThingDescription } from '../interfaces/thing-description';
import { InternalThingDescription } from '../models';

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
