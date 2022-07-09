import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';

import { User } from './../common/models';
import { AbstractRepository } from './abstract.repository';

@Injectable()
export class UserRepository extends AbstractRepository<User> {
  public constructor(@InjectKnex() protected readonly knex: Knex) {
    super(knex, 'user');
  }
}
