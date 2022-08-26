import { ProblemDetailsException } from './problem-details.exception';

export class MismatchIdException extends ProblemDetailsException {
  public constructor() {
    super({
      type: '/errors/types/mismatch-id-expection',
      title: 'Mismatch ID',
      status: 400,
      detail: 'The id specified in the URL does not match the id in the Thing Description body',
    });
  }
}
