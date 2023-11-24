import * as fs from 'fs/promises';

import defaultConfig from './default';
import { Configuration, ConfigurationValidationSchema } from './interfaces';

const configPath = './config.json';

export default async function load(): Promise<Configuration> {
  const configs = JSON.parse(await fs.readFile(configPath, 'utf8'));
  const result = ConfigurationValidationSchema.validate(configs);

  if (result.error) {
    throw result.error;
  }

  const envs: Configuration = {
    app: {
      apiBase: process.env.ZION_APP_API_BASE ?? result.value.app.apiBase,
      host: process.env.ZION_APP_HOST ?? result.value.app.host,
      port: parseInt(process.env.ZION_APP_PORT ?? '' + result.value.app.port, 10),
      version: process.env.npm_package_version ?? result.value.app.version,
    },
    db: {
      host: process.env.ZION_DB_HOST ?? defaultConfig.db.host,
      port: parseInt(process.env.ZION_DB_PORT ?? '' + defaultConfig.db.port, 10),
      user: process.env.ZION_DB_USER ?? defaultConfig.db.user,
      password: process.env.ZION_DB_PASSWORD ?? defaultConfig.db.password,
      database: process.env.ZION_DB_DATABASE ?? defaultConfig.db.database,
    },
    auth: {
      jwt: {
        secret: process.env.ZION_JWT_SECRET ?? defaultConfig.auth.jwt.secret,
        expiresIn: process.env.ZION_JWT_EXPIRES_IN ?? defaultConfig.auth.jwt.expiresIn,
      },
    },
    introduction: {
      mdns: {
        name: process.env.ZION_INTRODUCTION_MDNS_NAME ?? defaultConfig.introduction.mdns.name,
        toPath: process.env.ZION_INTRODUCTION_MDNS_TO_PATH ?? defaultConfig.introduction.mdns.toPath,
      },
    },
    thingDescriptionEvents: {
      maxEvents: parseInt(
        process.env.ZION_THING_DESCRIPTION_EVENTS_MAX_EVENTS ?? '' + defaultConfig.thingDescriptionEvents.maxEvents,
        10,
      ),
    },
  };
  return envs;
}
