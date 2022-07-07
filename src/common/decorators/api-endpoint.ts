import { applyDecorators } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';

import { ApiEndpointOptions } from './../interfaces/api-endpoint-options';

export function ApiEndpoint(options: ApiEndpointOptions): MethodDecorator {
  const headers = options.headers?.map((header) => ApiHeader(header)) || [];
  const params = options.params?.map((param) => ApiParam(param)) || [];
  const queries = options.queries?.map((query) => ApiQuery(query)) || [];
  const responses = options.responses?.map((response) => ApiResponse(response)) || [];

  const decorators: MethodDecorator[] = [];

  if (options.operation) {
    decorators.push(ApiOperation(options.operation));
  }

  decorators.push(...headers);
  decorators.push(...params);
  decorators.push(...queries);
  decorators.push(...responses);

  return applyDecorators(...decorators);
}
