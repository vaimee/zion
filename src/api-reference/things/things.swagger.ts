import { ApiEndpoint } from './../../common/decorators';

export function ApiCreate() {
  return ApiEndpoint({
    operation: {
      summary: 'Create an anonymous Thing Description',
      description: `Create a Thing Description and receive a unique system-generated \`id\` in response.
      The server rejects the request if there is an \`id\` in the body.
      To create a Thing Description with a user-defined \`id\`, use the \`PUT\` method.`,
      requestBody: {
        required: true,
        content: {
          'application/td+json': {
            examples: {
              'Anonymous TD': {
                $ref: '#/components/examples/AnonymousTD',
              },
            },
            schema: {
              $ref: '#/components/schemas/ThingDescription',
            },
          },
        },
      },
    },
    responses: [
      {
        status: 201,
        description: 'Created',
        headers: {
          Location: {
            schema: { type: 'string' },
            description: 'The URL to the newly created Thing Description',
          },
        },
      },
      {
        status: 400,
        description: 'Bad Request',
        content: {
          'application/problem+json': {
            schema: {
              oneOf: [
                { $ref: '#/components/schemas/ProblemDetails' },
                { $ref: '#/components/schemas/ValidationProblemDetails' },
              ],
            },
          },
        },
      },
      {
        status: 401,
        description: 'Unauthorized',
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

export function ApiRetrieve() {
  return ApiEndpoint({
    operation: {
      summary: 'Retrieve a Thing Description',
    },
    params: [
      {
        name: 'id',
        type: 'string',
        format: 'iri-reference',
        description: 'Thing Description ID',
      },
    ],
    queries: [
      {
        name: 'enriched',
        type: 'boolean',
        description: 'Include registration information attributes to the retrieved Thing Description',
        required: false,
      },
    ],
    responses: [
      {
        status: 200,
        description: 'OK',
        content: {
          'application/td+json': {
            examples: {
              'Thing Description': {
                $ref: '#/components/examples/ThingDescription',
              },
              'Enriched TD': {
                $ref: '#/components/examples/EnrichedTD',
              },
            },
            schema: {
              $ref: '#/components/schemas/ThingDescription',
            },
          },
        },
      },
      {
        status: 404,
        description: 'Not Found',
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

export function ApiUpsert() {
  return ApiEndpoint({
    operation: {
      summary: 'Create a new Thing Description with the provided ID, or update an existing one',
      description: `The \`id\` in the path is the resource id and must match the one in the Thing Description.
      To create a Thing Description without a user-defined \`id\`, use the \`POST\` method.`,
      requestBody: {
        required: true,
        content: {
          'application/td+json': {
            examples: {
              'Thing Description': {
                $ref: '#/components/examples/ThingDescription',
              },
            },
            schema: {
              $ref: '#/components/schemas/ThingDescription',
            },
          },
        },
      },
    },
    params: [
      {
        name: 'id',
        type: 'string',
        format: 'iri-reference',
        description: 'Thing Description ID',
        example: 'urn:example:1234',
      },
    ],
    responses: [
      {
        status: 201,
        description: 'Created',
      },
      {
        status: 204,
        description: 'No Content',
      },
      {
        status: 400,
        description: 'Bad Request',
        content: {
          'application/problem+json': {
            schema: {
              oneOf: [
                { $ref: '#/components/schemas/ProblemDetails' },
                { $ref: '#/components/schemas/ValidationProblemDetails' },
              ],
            },
          },
        },
      },
      {
        status: 401,
        description: 'Unauthorized',
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

export function ApiUpdate() {
  return ApiEndpoint({
    operation: {
      summary: 'Partially update a Thing Description',
      description: `The partial update is processed using the JSON merge patch format described in [<a href="https://datatracker.ietf.org/doc/html/rfc7396" target="_blank">RFC7396</a>].`,
      requestBody: {
        required: true,
        content: {
          'application/merge-patch+json': {
            examples: {
              'Partial TD': {
                $ref: '#/components/examples/PartialTD',
              },
            },
            schema: {
              $ref: '#/components/schemas/ThingDescription',
            },
          },
        },
      },
    },
    params: [
      {
        name: 'id',
        type: 'string',
        format: 'iri-reference',
        description: 'Thing Description ID',
        example: 'urn:example:1234',
      },
    ],
    responses: [
      {
        status: 204,
        description: 'No Content',
      },
      {
        status: 400,
        description: 'Bad Request',
        content: {
          'application/problem+json': {
            schema: {
              oneOf: [
                { $ref: '#/components/schemas/ProblemDetails' },
                { $ref: '#/components/schemas/ValidationProblemDetails' },
              ],
            },
          },
        },
      },
      {
        status: 401,
        description: 'Unauthorized',
        content: {
          'application/problem+json': {
            schema: {
              $ref: '#/components/schemas/ProblemDetails',
            },
          },
        },
      },
      {
        status: 404,
        description: 'Not Found',
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

export function ApiDelete() {
  return ApiEndpoint({
    operation: {
      summary: 'Delete a Thing Description',
    },
    params: [
      {
        name: 'id',
        type: 'string',
        format: 'iri-reference',
        description: 'Thing Description ID',
        example: 'urn:example:1234',
      },
    ],
    responses: [
      {
        status: 204,
        description: 'No Content',
      },
      {
        status: 401,
        description: 'Unauthorized',
        content: {
          'application/problem+json': {
            schema: {
              $ref: '#/components/schemas/ProblemDetails',
            },
          },
        },
      },
      {
        status: 404,
        description: 'Not Found',
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

export function ApiList() {
  return ApiEndpoint({
    operation: {
      summary: 'Retrieve all Thing Descriptions',
    },
    queries: [
      {
        name: 'enriched',
        type: 'boolean',
        description: 'Include registration information attributes to the retrieved Thing Descriptions',
        required: false,
      },
    ],
    responses: [
      {
        status: 200,
        description: 'OK',
        content: {
          'application/ld+json': {
            examples: {
              'Thing Description': {
                $ref: '#/components/examples/ThingDescription',
              },
              'Enriched TD': {
                $ref: '#/components/examples/EnrichedTD',
              },
            },
            schema: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/ThingDescription',
              },
            },
          },
        },
      },
    ],
  });
}
