import { path as rootPath } from 'app-root-path';
import * as dotenv from 'dotenv';
import type { Knex } from 'knex';
dotenv.config();

const config: Knex.Config = {
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
  migrations: {
    directory: `${rootPath}/migrations`,
  },
  seeds: {
    directory: `${rootPath}/seeds`,
  },
};

export default config;
