import { path as rootPath } from 'app-root-path';
import * as dotenv from 'dotenv';
import type { Knex } from 'knex';
dotenv.config();

const foldersPath = `${rootPath}/src/persistence/`;

const config: Knex.Config = {
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
  migrations: {
    directory: `${foldersPath}/migrations`,
  },
  seeds: {
    directory: `${foldersPath}/seeds`,
  },
};

export default config;
