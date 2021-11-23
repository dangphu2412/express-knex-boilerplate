// @ts-check

import { BcryptService } from 'core/modules/auth';

export const seed = async function createDummyUsers(knex) {
    const hashedPwd = await BcryptService.hash('@@123456Fus');
    await knex('users').insert([
        { id: 1, username: 'fusdeptrai', password: hashedPwd },
        { id: 2, username: 'fusdeptrai2', password: hashedPwd },
        { id: 3, username: 'fusdeptrai3', password: hashedPwd }
    ]);
};
