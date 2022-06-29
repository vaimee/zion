import { HttpStatus } from '@nestjs/common';

import { ValidationError } from './validation-error';

export interface ProblemDetails {
  type?: string;
  title?: string;
  status: HttpStatus;
  detail?: string;
  instance?: string;
}

export interface ValidationProblemDetails extends ProblemDetails {
  validationErrors: ValidationError[];
}
