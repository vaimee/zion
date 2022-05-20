import { InjectKnex, Knex } from 'nestjs-knex';

import { Model } from '../common/models/model';
import { Repository } from './repository.interface';

export abstract class AbstractRepository<T extends Model> implements Repository<T> {
  public constructor(@InjectKnex() protected readonly knex: Knex, private readonly namespace: string) {}

  public create(item: T): Promise<T> {
    throw new Error('Method not implemented.');
  }

  public update(id: number, item: Partial<T>): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public delete(id: number): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public find(item: Partial<T>): Promise<T[]> {
    throw new Error('Method not implemented.');
  }

  public findOne(id: number | Partial<T>): Promise<T> {
    throw new Error('Method not implemented.');
  }

  public exist(id: number | Partial<T>): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
