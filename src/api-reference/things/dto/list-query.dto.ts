import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional } from 'class-validator';

import { ListPayloadFormat, ListQuery, ListSortOrder } from '../things.interface';

export class ListQueryDto implements ListQuery {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  public readonly offset: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  public readonly limit?: number;

  @IsOptional()
  @IsEnum(ListPayloadFormat)
  public readonly format: ListPayloadFormat;

  @IsOptional()
  public readonly sort_by: string;

  @IsOptional()
  @IsEnum(ListSortOrder)
  public readonly sort_order: ListSortOrder;

  public constructor() {
    this.offset = 0;
    this.format = ListPayloadFormat.ARRAY;
    this.sort_by = 'id';
    this.sort_order = ListSortOrder.ASC;
  }
}
