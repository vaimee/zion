import Knex from 'knex';

async function getKnexClient() {
  const knex = Knex({
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    },
  });

  try {
    await knex.raw('SELECT now()');
    return knex;
  } catch (error) {
    throw new Error('Unable to connect to the database via Knex');
  }
}

export async function emptyDatabase() {
  const knex = await getKnexClient();
  await knex('user').del();
}
