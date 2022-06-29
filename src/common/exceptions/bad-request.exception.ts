import { ProblemDetailsException } from './problem-details.exception';

export class BadRequestException extends ProblemDetailsException {
  public constructor(detail?: string) {
    super({
      type: '/errors/types/bad-request',
      title: 'Bad Request',
      status: 400,
      detail,
    });
  }
}
