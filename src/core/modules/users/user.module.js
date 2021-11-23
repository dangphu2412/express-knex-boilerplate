import { Module } from 'packages/handler/Module';
import { SpecificRoleGuard } from '../auth';
import { RoleMasks } from '../roles/role.enum';
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
            preAuthorization: true,
            guards: [new SpecificRoleGuard(RoleMasks.Admin)],
            method: 'get',
        },
        {
            route: '/',
            controller: UserController.createOne,
            body: 'CreateUserDTO',
            interceptors: [],
            method: 'post',
        },
        {
            route: '/',
            controller: UserController.updateSelf,
            method: 'patch',
        }
    ]);
