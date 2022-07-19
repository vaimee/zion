import { Injectable } from '@nestjs/common';
import { transform } from '@vaimee/jsonpath-to-sqljsonpath';
import { InjectKnex, Knex } from 'nestjs-knex';

import { InternalThingDescription } from './../common/models';
import { AbstractRepository } from './abstract.repository';

@Injectable()
export class ThingDescriptionRepository extends AbstractRepository<InternalThingDescription> {
  public constructor(@InjectKnex() protected readonly knex: Knex) {
    super(knex, 'thing_description');
  }

  public async findJSONPath(query: string): Promise<unknown> {
    const sqljsonpathQueries = transform(query);
    const queryBuilder = this.knex.unionAll(
      sqljsonpathQueries.map((q) =>
        this.knex(this.namespace).select(this.knex.raw('jsonb_path_query(json, ?) as _', q)),
      ),
    );
    const results = await queryBuilder;
    return results.map((item: any) => item['_']);
  }
}
