import { path as rootPath } from 'app-root-path';
import * as dotenv from 'dotenv';
import type { Knex } from 'knex';

const baseEnvPath = `${process.cwd()}`;
const envPath =
  process.env.NODE_ENV === undefined ? `${baseEnvPath}/.env` : `${baseEnvPath}/${process.env.NODE_ENV}.env`;
dotenv.config({
  path: envPath,
  debug: true,
});

const config: Knex.Config = {
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_TYPE,
  },
  migrations: {
    directory: `${rootPath}/migrations`,
  },
  seeds: {
    directory: `${rootPath}/seeds`,
  },
};

export default config;
