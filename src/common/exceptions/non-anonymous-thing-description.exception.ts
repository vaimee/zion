import { ProblemDetailsException } from './problem-details.exception';

export class NonAnonymousThingDescription extends ProblemDetailsException {
  public constructor() {
    super({
      type: '/errors/types/non-anonymous-thing-description',
      title: 'Invalid Identified Thing Description',
      status: 400,
      detail: 'POST /things endpoint does not accept Thing Description with id, only anonymous Thing Description.',
    });
  }
}
