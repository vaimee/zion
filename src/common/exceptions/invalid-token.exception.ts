import { ProblemDetailsException } from './problem-details.exception';

export class InvalidTokenException extends ProblemDetailsException {
  public constructor() {
    super({
      type: '/errors/types/invalid-token',
      title: 'Invalid Token',
      status: 401,
      detail: 'Token is invalid or expired',
    });
  }
}
