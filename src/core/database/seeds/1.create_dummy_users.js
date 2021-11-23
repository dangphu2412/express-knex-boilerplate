import { BcryptService } from 'core/modules/auth/service/bcrypt.service';

export const seed = async function createDummyUsers(knex) {
    const hashedPwd = await BcryptService.hash('Sgroup123@@');
    await knex('users').insert([
        {
            id: 1, username: 'fusdeptrai', email: 'fusdeptrai@gmail.com', password: hashedPwd
        },
        {
            id: 2, username: 'fusdeptrai2', email: 'fusdeptrai2@gmail.com', password: hashedPwd
        },
        {
            id: 3, username: 'fusdeptrai3', email: 'fusdeptrai3@gmail.com', password: hashedPwd
        }
    ]);
};
