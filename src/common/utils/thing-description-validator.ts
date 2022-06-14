import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import * as addFormatsDraft from 'ajv-formats-draft2019';
import * as schema from 'wot-thing-description-types/schema/td-json-schema-validation.json';

import { ValidationError } from './../interfaces/validation-error';

const ajv = new Ajv({ strict: false });
addFormats(ajv);
addFormatsDraft(ajv);

const validate = ajv.compile(schema);

export function validateThingDescription(data: unknown): { valid: boolean; errors?: ValidationError[] } {
  const valid = validate(data);
  let errors: ValidationError[] | undefined;
  if (!valid) {
    errors = validate.errors?.map((error) => {
      return {
        field: error.instancePath,
        description: error.message,
      };
    });
  }
  return { valid, errors };
}
