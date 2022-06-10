import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional } from 'class-validator';

export enum ThingDescriptionsQueryPayloadFormat {
  ARRAY = 'array',
  COLLECTION = 'collection',
}

export enum ThingDescriptionsQuerySortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export class ThingDescriptionsQueryDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  public readonly offset: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  public readonly limit?: number;

  @IsOptional()
  @IsEnum(ThingDescriptionsQueryPayloadFormat)
  public readonly format: ThingDescriptionsQueryPayloadFormat;

  @IsOptional()
  public readonly sort_by: string;

  @IsOptional()
  @IsEnum(ThingDescriptionsQuerySortOrder)
  public readonly sort_order: 'asc' | 'desc';

  public constructor() {
    this.offset = 0;
    this.format = ThingDescriptionsQueryPayloadFormat.ARRAY;
    this.sort_by = 'id';
    this.sort_order = ThingDescriptionsQuerySortOrder.ASC;
  }
}
