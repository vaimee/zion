import { HttpException } from '@nestjs/common';

import { ProblemDetails } from './../interfaces/problem-details';

export class ProblemDetailsException<T extends ProblemDetails = ProblemDetails> extends HttpException {
  public constructor(object: T) {
    super(HttpException.createBody(object), object.status);
  }
}
