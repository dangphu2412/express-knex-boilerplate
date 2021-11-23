// @ts-check

import { RoleMasks } from 'core/modules/roles/role.enum';

/**
 * @param {import("knex").Knex} knex
 */
export async function up(knex) {
    const tracsaction = await knex.transaction();
    try {
        await tracsaction.table('roles')
            .insert(Object.values(RoleMasks)
                .map(name => ({ name })));

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
        await knex.table('users_roles').del();
        await tracsaction.commit();
    } catch (error) {
        await tracsaction.rollback();
    }
}
