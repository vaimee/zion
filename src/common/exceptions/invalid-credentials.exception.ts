import { ProblemDetailsException } from './problem-details.exception';

export class InvalidCredentialsException extends ProblemDetailsException {
  public constructor() {
    super({
      type: '/errors/types/invalid-credentials',
      title: 'Invalid Credentials',
      status: 401,
      detail: 'No active account found with the given credentials',
    });
  }
}
