import { Injectable } from '@nestjs/common';

import { ThingDescription } from './../../common/models/thing-description.model';
import { ThingDescriptionRepository } from './../../persistence/thing-description.repository';
import { ThingDescriptionDto } from './dto/thing-description.dto';
import { ThingDescriptionsQueryDto } from './dto/thing-descriptions-query.dto';

@Injectable()
export class ThingsService {
  public constructor(private readonly thingDescriptionRepository: ThingDescriptionRepository) {}

  public async create(dto: ThingDescriptionDto): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public retrieve(id: string): Promise<ThingDescription> {
    throw new Error('Method not implemented.');
  }

  public upsert(id: string, dto: ThingDescriptionDto): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public update(id: string, dto: ThingDescriptionDto): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public list(query: ThingDescriptionsQueryDto): Promise<ThingDescription[]> {
    throw new Error('Method not implemented.');
  }
}
