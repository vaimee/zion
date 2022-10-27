import { Injectable } from '@nestjs/common';

import { TDLifecycleEvent } from '../common/models';
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
export class TDLifecycleEventRepository implements Repository<TDLifecycleEvent> {
  private events: TDLifecycleEvent[];
  private maxEvents: number;

  //TODO: check injection of ConfigService
  public constructor(config: ConfigService) {
    this.events = [];
    this.maxEvents = config.thingDescriptionEvents.maxEvents;
  }

  public async create(item: Omit<TDLifecycleEvent, 'id'>): Promise<TDLifecycleEvent> {
    if (this.events.length >= this.maxEvents) {
      this.events.shift();
    }
    const event = { ...item, id: ids++ };
    this.events.push(event);
    return event;
  }

  public update(args: UpdateArgs<TDLifecycleEvent>): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public delete(args: DeleteArgs<TDLifecycleEvent>): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public find(args?: FindArgs<TDLifecycleEvent> | undefined): Promise<TDLifecycleEvent[]> {
    throw new Error('Method not implemented.');
  }

  public findOne(args: FindOneArgs<TDLifecycleEvent>): Promise<TDLifecycleEvent> {
    throw new Error('Method not implemented.');
  }

  public findFirst(args: FindFirstArgs<TDLifecycleEvent>): Promise<TDLifecycleEvent> {
    throw new Error('Method not implemented.');
  }

  public exist(args: ExistArgs<TDLifecycleEvent>): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  public async findAfter(id: TDLifecycleEvent['id']): Promise<TDLifecycleEvent[]> {
    const index = this.events.findIndex((event) => event.id >= id);
    return this.events.slice(index + 1);
  }
}
