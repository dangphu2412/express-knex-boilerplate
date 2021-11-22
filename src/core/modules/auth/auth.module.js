import { loginInterceptor } from 'core/modules/auth';
import { Module } from 'packages/handler';
import { AuthController } from './auth.controller';

export const AuthResolver = Module.builder()
    .addPrefix({
        prefixPath: '/auth',
        tag: 'auth',
        module: 'AuthModule'
    })
    .register([
        {
            route: '/',
            method: 'post',
            interceptors: [loginInterceptor],
            controller: AuthController.login,
            body: 'LoginDto'
        },
    ]);
