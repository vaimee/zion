import { Injectable } from '@nestjs/common';

import { BadRequestException } from './../../common/exceptions';
import { ThingDescriptionRepository } from './../../persistence/thing-description.repository';

@Injectable()
export class SearchService {
  public constructor(private readonly thingDescriptionRepository: ThingDescriptionRepository) {}

  public async searchJSONPath(query: string): Promise<any> {
    try {
      return await this.thingDescriptionRepository.findJSONPath(query);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  public searchXPath(query: string): Promise<any> {
    throw new Error('Method not implemented.');
  }

  public searchSPARQL(query: string): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
