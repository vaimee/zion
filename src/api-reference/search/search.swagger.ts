import { ApiEndpoint } from './../../common/decorators';

export function ApiSearchJSONPath() {
  return ApiEndpoint({
    operation: {
      summary: 'JSONPath syntactic search',
    },
    queries: [
      {
        name: 'query',
        type: 'string',
        description: 'A valid JSONPath expression',
      },
    ],
    responses: [
      {
        status: 200,
        type: 'application/json',
        description: 'Success response',
      },
      {
        status: 400,
        type: 'application/problem+json',
        description: 'JSONPath expression not provided or contains syntax errors',
      },
    ],
  });
}

export function ApiSearchXPath() {
  return ApiEndpoint({
    operation: {
      summary: 'XPath syntactic search',
    },
    queries: [
      {
        name: 'query',
        type: 'string',
        description: 'A valid XPath expression',
      },
    ],
    responses: [
      {
        status: 200,
        type: 'application/json',
        description: 'Success response',
      },
      {
        status: 400,
        type: 'application/problem+json',
        description: 'XPath expression not provided or contains syntax errors',
      },
    ],
  });
}

export function ApiSearchSPARQL() {
  return ApiEndpoint({
    operation: {
      summary: 'SPARQL semantic search',
    },
    queries: [
      {
        name: 'query',
        type: 'string',
        description: 'A valid SPARQL 1.1. query',
      },
    ],
    responses: [
      {
        status: 200,
        type: 'application/json',
        description: 'Success response',
      },
      {
        status: 400,
        type: 'application/problem+json',
        description: 'SPARQL query not provided or contains syntax errors',
      },
    ],
  });
}
