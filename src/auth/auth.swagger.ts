import { ApiEndpoint } from './../common/decorators';

export function ApiLogin() {
  return ApiEndpoint({
    operation: {
      summary: 'Log a user into the system',
    },
    responses: [
      {
        status: 201,
        description: 'Created',
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

export function ApiRegister() {
  return ApiEndpoint({
    operation: {
      summary: 'Create a user',
    },
    responses: [
      {
        status: 201,
        description: 'Created',
      },
      {
        status: 409,
        description: 'Conflict',
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
