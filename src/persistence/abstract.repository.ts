import { Knex } from 'nestjs-knex';

import { Model } from '../common/models/model';
import {
  DeleteArgs,
  ExistArgs,
  FindArgs,
  FindFirstArgs,
  FindOneArgs,
  Repository,
  UpdateArgs,
} from './repository.interface';

export abstract class AbstractRepository<T extends Model> implements Repository<T> {
  public constructor(protected readonly knex: Knex, protected readonly namespace: string) {}

  public async create(item: Partial<T>): Promise<T> {
    const trx = await this.knex.transaction();
    try {
      const ids = await trx(this.namespace).insert(item, 'id');
      const res = await trx(this.namespace).first('*').where(ids[0]);
      await trx.commit();
      return res;
    } catch (error) {
      await trx.rollback(error);
      throw error;
    }
  }

  public async update(args: UpdateArgs<T>): Promise<void> {
    return this.knex(this.namespace).where(args.where).update(args.data);
  }

  public async delete(args: DeleteArgs<T>): Promise<void> {
    return this.knex(this.namespace).where(args.where).del();
  }

  public async find(args?: FindArgs<T>): Promise<T[]> {
    const query = this.knex(this.namespace).select('*');
    if (args?.where) {
      query.where(args.where);
    }
    return query;
  }

  public async findOne(args: FindOneArgs<T>): Promise<T> {
    return this.knex(this.namespace).first('*').where(args.where);
  }

  public async findFirst(args: FindFirstArgs<T>): Promise<T> {
    return this.knex(this.namespace).first('*').where(args.where);
  }

  public async exist(args: ExistArgs<T>): Promise<boolean> {
    const res = await this.knex(this.namespace).count('id as count').where(args.where);
    return res[0]['count'] > 0;
  }
}
