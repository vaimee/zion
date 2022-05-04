import { Injectable } from '@nestjs/common';
import { ThingDescription } from 'wot-thing-description-types';

import { ListQuery, ThingsAPI } from './things.interface';

@Injectable()
export class ThingsService implements ThingsAPI {
  public create(td: ThingDescription): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public retrieve(id: string): Promise<ThingDescription> {
    throw new Error('Method not implemented.');
  }

  public upsert(id: string, td: ThingDescription): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public update(id: string, td: Partial<ThingDescription>): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public list(query: ListQuery): Promise<ThingDescription[]> {
    throw new Error('Method not implemented.');
  }
}
