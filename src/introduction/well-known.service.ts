import { Injectable } from '@nestjs/common';
import { ThingDescription } from 'wot-thing-description-types';

import { ThingDescriptionBuilderService } from './td-builder.service';

@Injectable()
export class WellKnownService {
  public constructor(private readonly builder: ThingDescriptionBuilderService) {}

  public async getThingDescription(): Promise<ThingDescription> {
    return this.builder.build();
  }

  public async size(): Promise<number> {
    // TODO: cache the result ?
    const td = await this.builder.build();
    const payload = JSON.stringify(td);
    return Buffer.byteLength(payload, 'utf8');
  }
}
