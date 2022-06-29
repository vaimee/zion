import { ProblemDetailsException } from './problem-details.exception';

export class NotFoundException extends ProblemDetailsException {
  public constructor(detail?: string) {
    super({
      type: '/errors/types/not-found',
      title: 'Not Found',
      status: 404,
      detail,
    });
  }
}
