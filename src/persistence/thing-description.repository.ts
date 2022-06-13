import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';

import { InternalThingDescription } from './../common/models/thing-description';
import { AbstractRepository } from './abstract.repository';

@Injectable()
export class ThingDescriptionRepository extends AbstractRepository<InternalThingDescription> {
  public constructor(@InjectKnex() protected readonly knex: Knex) {
    super(knex, 'thing_description');
  }
}
