import { Injectable } from '@nestjs/common';

import { TDLifeCycleEvent } from './../common/models/events';
import { ConfigService } from '../config/config.service';
import {
  DeleteArgs,
  ExistArgs,
  FindArgs,
  FindFirstArgs,
  FindOneArgs,
  Repository,
  UpdateArgs,
} from './repository.interface';

let ids = 0;
/**
 * In memory implementation of an Event Repository.
 * TODO: we should store events in a database like Redis.
 */
@Injectable()
export class TDLifeCycleEventRepository implements Repository<TDLifeCycleEvent> {
  private events: TDLifeCycleEvent[];
  private maxEvents: number;

  //TODO: check injection of ConfigService
  public constructor(config: ConfigService) {
    this.events = [];
    this.maxEvents = config.maxEvents;
  }

  public async create(item: Omit<TDLifeCycleEvent, 'id'>): Promise<TDLifeCycleEvent> {
    if (this.events.length >= this.maxEvents) {
      this.events.shift();
    }
    const event = { ...item, id: ids++ };
    this.events.push(event);
    return event;
  }
  public update(args: UpdateArgs<TDLifeCycleEvent>): Promise<void> {
    throw new Error('Method not implemented.');
  }
  public delete(args: DeleteArgs<TDLifeCycleEvent>): Promise<void> {
    throw new Error('Method not implemented.');
  }
  public find(args?: FindArgs<TDLifeCycleEvent> | undefined): Promise<TDLifeCycleEvent[]> {
    throw new Error('Method not implemented.');
  }
  public findOne(args: FindOneArgs<TDLifeCycleEvent>): Promise<TDLifeCycleEvent> {
    throw new Error('Method not implemented.');
  }
  public findFirst(args: FindFirstArgs<TDLifeCycleEvent>): Promise<TDLifeCycleEvent> {
    throw new Error('Method not implemented.');
  }
  public exist(args: ExistArgs<TDLifeCycleEvent>): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  public async findAfter(id: TDLifeCycleEvent['id']): Promise<TDLifeCycleEvent[]> {
    const index = this.events.findIndex((event) => event.id >= id);
    return this.events.slice(index + 1);
  }
}
