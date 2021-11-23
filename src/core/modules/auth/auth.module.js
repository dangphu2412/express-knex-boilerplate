import { Module } from 'packages/handler';
import { AuthController } from './auth.controller';
import { LoginInterceptor } from './interceptor/login.interceptor';
import { RegisterInterceptor } from './interceptor/register.interceptor';

export const AuthResolver = new Module()
    .addPrefix({
        prefixPath: '/auth',
        tag: 'auth',
        module: 'AuthModule'
    })
    .register([
        {
            route: '/register',
            method: 'post',
            interceptors: [RegisterInterceptor],
            controller: AuthController.register,
            body: 'RegisterDTO'
        },
        {
            route: '/login',
            method: 'post',
            interceptors: [LoginInterceptor],
            controller: AuthController.login,
            body: 'LoginDTO'
        },
    ]);
