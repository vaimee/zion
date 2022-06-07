import { Exclude } from 'class-transformer';

import { Model } from './model';

export class User extends Model {
  public email!: string;

  @Exclude()
  public password!: string;
}
