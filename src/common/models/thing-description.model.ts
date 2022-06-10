import {
  ActionElement,
  AnyUri,
  DataSchema,
  Description,
  Descriptions,
  EventElement,
  FormElementRoot,
  IconLinkElement,
  LinkElement,
  PropertyElement,
  SecurityScheme,
  ThingContext,
  ThingDescription as ThingDescriptionSpecification,
  Title,
  Titles,
  TypeDeclaration,
} from 'wot-thing-description-types';

import { Model } from './model';

export class ThingDescription extends Model implements ThingDescriptionSpecification {
  public id?: string;
  public title!: Title;
  public titles?: Titles;
  public properties?: {
    [k: string]: PropertyElement;
  };
  public actions?: {
    [k: string]: ActionElement;
  };
  public events?: {
    [k: string]: EventElement;
  };
  public description?: Description;
  public descriptions?: Descriptions;
  public version?: {
    instance: string;
    [k: string]: unknown;
  };
  public links?: (LinkElement | IconLinkElement)[];
  public forms?: [FormElementRoot, ...FormElementRoot[]];
  public base?: AnyUri;
  public securityDefinitions!: {
    [k: string]: SecurityScheme;
  };
  public schemaDefinitions?: {
    [k: string]: DataSchema;
  };
  public support?: AnyUri;
  public created?: string;
  public modified?: string;
  public profile?: AnyUri | [AnyUri, ...AnyUri[]];
  public security!: string | [string, ...string[]];
  public uriVariables?: {
    [k: string]: DataSchema;
  };
  public '@type'?: TypeDeclaration;
  public '@context': ThingContext;
  [k: string]: unknown;
}
