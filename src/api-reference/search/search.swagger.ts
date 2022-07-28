import { ApiEndpoint } from './../../common/decorators';

export function ApiSearchJSONPath() {
  return ApiEndpoint({
    operation: {
      summary: 'JSONPath syntactic search',
      description: `The query language described <a href="https://datatracker.ietf.org/doc/html/draft-ietf-jsonpath-base" target="_blank">here</a> can be used to filter results and select parts of Thing Descriptions.`,
    },
    queries: [
      {
        name: 'query',
        type: 'string',
        description: 'A valid JSONPath expression',
        example: `$[?(@.title=='MyLampThing')].properties`,
      },
    ],
    responses: [
      {
        status: 200,
        description: 'OK',
        content: {
          'application/json': {
            examples: {
              'JSONPath result': {
                $ref: '#/components/examples/JSONPath',
              },
            },
          },
        },
      },
      {
        status: 400,
        description: 'Bad Request',
        content: {
          'application/problem+json': {
            schema: {
              $ref: '#/components/schemas/ProblemDetails',
            },
          },
        },
      },
    ],
  });
}

export function ApiSearchXPath() {
  return ApiEndpoint({
    operation: {
      summary: 'XPath syntactic search',
    },
  });
}

export function ApiSearchSPARQL() {
  return ApiEndpoint({
    operation: {
      summary: 'SPARQL semantic search',
    },
  });
}
