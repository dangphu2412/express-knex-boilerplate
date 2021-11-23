import { Module } from 'packages/handler/Module';
import { UserController } from './user.controller';

export const UserResolver = new Module()
    .addPrefix({
        prefixPath: '/users',
        tag: 'users',
        module: 'UserModule'
    })
    .register([
        {
            route: '/',
            controller: UserController.findAll,
            method: 'get',
        }
    ]);
