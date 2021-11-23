// @ts-check

import { RoleMasks } from 'core/modules/roles/role.enum';

/**
 * @param {import("knex").Knex} knex
 */
export const seed = async function createDummyUsers(knex) {
    const trx = await knex.transaction();
    try {
        const roles = await trx('roles').select();
        let adminId;
        roles.forEach(role => {
            if (role.name === RoleMasks.Admin) {
                adminId = role.id;
            }
        });

        const users = await trx('users').select();

        await trx('users_roles').insert(users.map(user => ({
            users_id: user.id,
            roles_id: adminId
        })));

        await trx.commit();
    } catch (error) {
        await trx.rollback();
    }
};
