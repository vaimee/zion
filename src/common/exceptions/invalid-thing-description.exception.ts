import { ValidationProblemDetails } from './../interfaces/problem-details';
import { ValidationError } from './../interfaces/validation-error';
import { ProblemDetailsException } from './problem-details.exception';

export class InvalidThingDescriptionException extends ProblemDetailsException<ValidationProblemDetails> {
  public constructor(validationErrors: ValidationError[]) {
    super({
      type: '/errors/types/invalid-thing-description',
      title: 'Invalid Thing Description',
      status: 400,
      detail: 'The input did not pass the JSON Schema validation',
      validationErrors,
    });
  }
}
