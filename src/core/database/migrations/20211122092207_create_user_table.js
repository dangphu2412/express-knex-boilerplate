// @ts-check
/**
 * @param {import("knex").Knex} knex
 */
export async function up(knex) {
    const tracsaction = await knex.transaction();
    try {
        await tracsaction.schema.createTable('users', table => {
            table.increments('id');
            table.string('username').unique().notNullable();
            table.string('fullname').defaultTo('');
            table.string('email').defaultTo('');
            table.string('password').notNullable();
            table.timestamps(true, true);
        });
        await tracsaction.commit();
    } catch (error) {
        await tracsaction.rollback();
    }
}

/**
 * @param {import("knex").Knex} knex
 */
export async function down(knex) {
    const tracsaction = await knex.transaction();
    try {
        await tracsaction.schema.dropTableIfExists('users');
        await tracsaction.commit();
    } catch (error) {
        await tracsaction.rollback();
    }
}
