import { InjectKnex, Knex } from 'nestjs-knex';

import { BaseModel } from '../common/models/base.model';
import { Repository } from './repository.interface';

export abstract class AbstractRepository<T extends BaseModel> implements Repository<T> {
  public constructor(@InjectKnex() protected readonly knex: Knex, private readonly namespace: string) {}

  public create(item: T): Promise<T> {
    throw new Error('Method not implemented.');
  }

  public update(id: string, item: Partial<T>): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public find(item: Partial<T>): Promise<T[]> {
    throw new Error('Method not implemented.');
  }

  public findOne(id: string | Partial<T>): Promise<T> {
    throw new Error('Method not implemented.');
  }

  public exist(id: string | Partial<T>): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
