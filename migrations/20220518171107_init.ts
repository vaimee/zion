import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('user', (table) => {
      table.increments('id').primary();
      table.string('email').unique().notNullable();
      table.string('password').notNullable();
      table.timestamps(true, true);
    })
    .createTable('thing_description', (table) => {
      table.increments('id').primary();
      table.string('urn').unique().notNullable();
      table.jsonb('json').notNullable();
      table.timestamp('created');
      table.timestamp('modified');
      table.timestamp('expires');
      table.integer('ttl');
      table.integer('owner_id').references('id').inTable('user').notNullable();
    });
}

export async function down(knex: Knex): Promise<void> {
  // Nothing
}
