import { hashSync } from 'bcrypt';
import Knex from 'knex';

import { User } from '../../src/common/models/user';
import { getUniqueEmail } from './data';

const knex = Knex({
  client: 'pg',
  connection: {
    host: process.env.ZION_DB_HOST,
    port: Number(process.env.ZION_DB_PORT),
    user: process.env.ZION_DB_USER,
    password: process.env.ZION_DB_PASSWORD,
    database: process.env.ZION_DB_DATABASE,
  },
});

export async function pingDatabase(): Promise<void> {
  try {
    await knex.raw('SELECT now()');
  } catch (error) {
    throw new Error('Unable to connect to the database via Knex');
  }
}

export async function emptyDatabase(): Promise<void> {
  await knex('thing_description').del();
  await knex('user').del();
}

export async function closeDatabase(): Promise<void> {
  return knex.destroy();
}

export async function createUser(): Promise<User> {
  const email = getUniqueEmail();
  const password = hashSync('test123', 10);
  const [user] = await knex<User>('user').insert({ email, password }).returning('*');
  return user;
}
