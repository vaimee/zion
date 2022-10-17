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

    const td = (await builder.getPartialTDs(model, options))[0];
    this.built = td as ThingDescription;
    // TODO: chose the right security schema using configs
    this.built.securityDefinitions = { nosec: { scheme: 'nosec' } };
    this.built.security = 'nosec';
    return this.built;
  }
}
