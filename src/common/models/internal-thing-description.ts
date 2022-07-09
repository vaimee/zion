import { ThingDescription } from './../interfaces/thing-description';
import { Model } from './model';

export class InternalThingDescription extends Model {
  public urn!: string;
  public json!: ThingDescription;
  public created?: string;
  public modified?: string;
  public expires?: string;
  public ttl?: number;
  public retrieved?: string;
  public owner_id!: number;
}
