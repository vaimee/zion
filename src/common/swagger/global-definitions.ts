import { OpenAPIObject } from '@nestjs/swagger';

import * as anonymousTDExample from './examples/anonymous-td.example.json';
import * as enrichedTDExample from './examples/enriched-td.example.json';
import * as jsonpathExample from './examples/jsonpath.example.json';
import * as partialTDExample from './examples/partial-td.example.json';
import * as thingDescriptionExample from './examples/thing-description.example.json';
import * as eventPayloadSchema from './schemas/event-payload.schema.json';
import * as problemDetailsSchema from './schemas/problem-details.schema.json';
import * as validationProblemDetailsSchema from './schemas/validation-problem-details.schema.json';

export function loadSwaggerExamples(document: OpenAPIObject): void {
  if (!document.components) document.components = {};
  if (!document.components.examples) document.components.examples = {};
  document.components.examples.AnonymousTD = { value: anonymousTDExample };
  document.components.examples.EnrichedTD = { value: enrichedTDExample };
  document.components.examples.PartialTD = { value: partialTDExample };
  document.components.examples.ThingDescription = { value: thingDescriptionExample };
  document.components.examples.JSONPath = { value: jsonpathExample };
}

export function loadSwaggerSchemas(document: OpenAPIObject): void {
  if (!document.components) document.components = {};
  if (!document.components.schemas) document.components.schemas = {};
  document.components.schemas.ThingDescription = {};
  document.components.schemas.ProblemDetails = problemDetailsSchema;
  document.components.schemas.ValidationProblemDetails = validationProblemDetailsSchema;
  document.components.schemas.EventPayload = eventPayloadSchema;
}
