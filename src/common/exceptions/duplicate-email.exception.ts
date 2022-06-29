import { ProblemDetailsException } from './problem-details.exception';

export class DuplicateEmailException extends ProblemDetailsException {
  public constructor() {
    super({
      type: '/errors/types/duplicate-email',
      title: 'Duplicate Email',
      status: 409,
      detail: 'Email is already in use',
    });
  }
}
