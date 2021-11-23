// @ts-check
/**
 * @param {import("knex").Knex} knex
 */
export async function up(knex) {
    const tracsaction = await knex.transaction();
    try {
        await tracsaction.schema.createTable('roles', table => {
            table.increments('id');
            table.string('name').unique().notNullable();
        });

        await tracsaction.schema.createTable('users_roles', table => {
            table.increments('id');
            table.integer('users_id').unsigned().references('id').inTable('users');
            table.integer('roles_id').unsigned().references('id').inTable('roles');
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
        await knex.schema.dropTableIfExists('users_roles');
        await knex.schema.dropTableIfExists('roles');
        await tracsaction.commit();
    } catch (error) {
        await tracsaction.rollback();
    }
}
