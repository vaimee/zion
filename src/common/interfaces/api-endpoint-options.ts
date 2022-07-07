import {
  ApiHeaderOptions,
  ApiOperationOptions,
  ApiParamOptions,
  ApiQueryOptions,
  ApiResponseOptions,
} from '@nestjs/swagger';

export interface ApiEndpointOptions {
  operation?: ApiOperationOptions;
  headers?: ApiHeaderOptions[];
  params?: ApiParamOptions[];
  queries?: ApiQueryOptions[];
  responses?: ApiResponseOptions[];
}
