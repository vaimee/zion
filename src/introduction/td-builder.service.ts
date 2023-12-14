import { Injectable } from '@nestjs/common';
import { CompositionOptions, ThingModelHelpers } from '@node-wot/td-tools';
import { ThingDescription } from 'wot-thing-description-types';

import { ConfigService } from '../config/config.service';
import * as model from './tdd.tm.json';

@Injectable()
export class ThingDescriptionBuilderService {
  private built?: ThingDescription;
  public constructor(private readonly config: ConfigService) {}

  public async build(): Promise<ThingDescription> {
    if (this.built) {
      return this.built;
    }

    const builder = new ThingModelHelpers();
    const options: CompositionOptions = {
      map: {
        DIRECTORY_BASE_URL: this.config.app.apiBase,
      },
    };

    // FIXME: Get rid of this workaround.
    const clonedModel = JSON.parse(JSON.stringify(model));
    const td = (await builder.getPartialTDs(clonedModel, options))[0];
    this.built = td as ThingDescription;
    // TODO: chose the right security schema using configs
    this.built.securityDefinitions = { nosec: { scheme: 'nosec' } };
    this.built.security = 'nosec';

    // TODO: Make inclusion of fix configurable
    this.insertResponseContentType();

    return this.built;
  }

  /**
   * Applies the fix described in section 7.3.2.4 of the Discovery specification to make the
   * TDD's Thing Description compatible with the TD specification and Consumers performing
   * validation by including a <code>contentType</code> that is missing from the TM
   * describing the directory's API.
   *
   * @see https://www.w3.org/TR/2023/REC-wot-discovery-20231205/#directory-api-spec
   */
  private insertResponseContentType(): void {
    const actions = this.built?.actions;

    if (actions == null) {
      return;
    }

    const actionsToFix = ['createThing', 'createAnonymousThing', 'updateThing', 'partiallyUpdateThing', 'deleteThing'];

    for (const key of actionsToFix) {
      const invalidResponse = actions[key]?.forms[0].response;

      if (invalidResponse == null) {
        continue;
      }

      invalidResponse['contentType'] = 'application/x-empty';
    }
  }
}
