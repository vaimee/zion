import { existsSync } from 'fs';

import { path as rootPath } from 'app-root-path';
import * as dotenv from 'dotenv';
import type { Knex } from 'knex';

const baseEnvPath = `${process.cwd()}`;
const envPath =
  process.env.NODE_ENV === undefined ? `${baseEnvPath}/.env` : `${baseEnvPath}/${process.env.NODE_ENV}.env`;

if (existsSync(envPath)) {
  dotenv.config({
    path: envPath,
    debug: true,
  });
} else {
  console.warn(
    `No .env file found at ${envPath}, using process.env. If you are running in a container please ensure that the environment variables are set.`,
  );
}

const config: Knex.Config = {
  client: 'pg',
  connection: {
    host: process.env.ZION_DB_HOST,
    port: Number(process.env.ZION_DB_PORT),
    user: process.env.ZION_DB_USER,
    password: process.env.ZION_DB_PASSWORD,
    database: process.env.ZION_DB_DATABASE,
  },
  migrations: {
    directory: `${rootPath}/migrations`,
  },
  seeds: {
    directory: `${rootPath}/seeds`,
  },
};

export default config;
