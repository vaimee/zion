import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';

import { InternalThingDescription } from './../common/models';
import { AbstractRepository } from './abstract.repository';

@Injectable()
export class ThingDescriptionRepository extends AbstractRepository<InternalThingDescription> {
  public constructor(@InjectKnex() protected readonly knex: Knex) {
    super(knex, 'thing_description');
  }

  public async findJSONPath(query: string): Promise<unknown> {
    const res = await this.knex(this.namespace).select(this.knex.raw('jsonb_path_query(json, ?) as _', query));
    return res.map((item: any) => item['_']);
  }
}
