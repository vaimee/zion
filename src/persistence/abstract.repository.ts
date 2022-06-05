import { Knex } from 'nestjs-knex';

import { Model } from '../common/models/model';
import { Repository } from './repository.interface';

export abstract class AbstractRepository<T extends Model> implements Repository<T> {
  public constructor(protected readonly knex: Knex, private readonly namespace: string) {}

  public async create(item: Partial<T>): Promise<T> {
    const trx = await this.knex.transaction();
    try {
      const ids = await trx(this.namespace).insert(item, 'id');
      const res = await trx(this.namespace).select('*').where({ id: ids[0] }).first();
      await trx.commit();
      return res;
    } catch (error) {
      await trx.rollback(error);
      throw error;
    }
  }

  public async update(id: number, item: Partial<T>): Promise<void> {
    return this.knex(this.namespace).where({ id }).update(item);
  }

  public async delete(id: number): Promise<void> {
    return this.knex(this.namespace).where({ id }).del();
  }

  public async find(item: Partial<T>): Promise<T[]> {
    return this.knex(this.namespace).select('*').where(item);
  }

  public async findOne(id: number | Partial<T>): Promise<T> {
    const filter = typeof id === 'number' ? { id } : id;
    return this.knex(this.namespace).select('*').where(filter).first();
  }

  public async exist(id: number | Partial<T>): Promise<boolean> {
    const filter = typeof id === 'number' ? { id } : id;
    const res = await this.knex(this.namespace).count('id as count').where(filter);
    return res[0]['count'] > 0;
  }
}
