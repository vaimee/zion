import { ProblemDetailsException } from './problem-details.exception';

export class DuplicateIdException extends ProblemDetailsException {
  public constructor(id: string) {
    super({
      type: '/errors/types/duplicate-id',
      title: 'Duplicate Id',
      status: 409,
      detail: `The id ${id} is already in use by another Thing Description`,
    });
  }
}
