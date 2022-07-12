import { ApiEndpoint } from './../../common/decorators';

export function ApiCreate() {
  return ApiEndpoint({
    operation: {
      summary: 'Create an anonymous Thing Description',
    },
    responses: [
      {
        status: 201,
        type: 'application/td+json',
        description: 'Success response including the system-generated URI',
        headers: {
          Location: {
            description: 'System-generated URI',
          },
        },
      },
      {
        status: 400,
        type: 'application/problem+json',
        description: 'Invalid serialization or TD',
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
        description: 'Include registration information attributes to the retrieved TD',
      },
    ],
    responses: [
      {
        status: 200,
        type: 'application/td+json',
        description: 'Success response',
      },
      {
        status: 404,
        type: 'application/problem+json',
        description: 'TD with the given id not found',
      },
    ],
  });
}

export function ApiUpsert() {
  return ApiEndpoint({
    operation: {
      summary: 'Creates a new Thing Description with the provided ID, or updates an existing one',
    },
    params: [
      {
        name: 'id',
        type: 'string',
        format: 'iri-reference',
        description: 'Thing Description ID',
      },
    ],
    responses: [
      {
        status: 201,
        type: 'application/td+json',
        description: 'Success response',
      },
      {
        status: 204,
        type: 'application/td+json',
        description: 'Success response',
      },
      {
        status: 400,
        type: 'application/problem+json',
        description: 'Invalid serialization or TD',
      },
    ],
  });
}

export function ApiUpdate() {
  return ApiEndpoint({
    operation: {
      summary: 'Partially update a Thing Description',
    },
    params: [
      {
        name: 'id',
        type: 'string',
        format: 'iri-reference',
        description: 'Thing Description ID',
      },
    ],
    responses: [
      {
        status: 204,
        type: 'application/merge-patch+json',
        description: 'Success response',
      },
      {
        status: 400,
        type: 'application/problem+json',
        description: 'Invalid serialization or TD',
      },
      {
        status: 404,
        type: 'application/problem+json',
        description: 'TD with the given id not found',
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
      },
    ],
    responses: [
      {
        status: 204,
        type: 'application/td+json',
        description: 'Success response',
      },
      {
        status: 404,
        type: 'application/problem+json',
        description: 'TD with the given id not found',
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
        description: 'Include registration information attributes to the retrieved TDs',
      },
    ],
    responses: [
      {
        status: 200,
        type: 'application/ld+json',
        headers: {
          Link: {
            description: 'Pointer to the next page of TDs',
          },
        },
      },
      {
        status: 400,
        type: 'application/problem+json',
        description: 'Invalid query arguments',
      },
    ],
  });
}
