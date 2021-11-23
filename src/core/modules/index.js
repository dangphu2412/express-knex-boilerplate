import { ApiDocument } from 'core/config/swagger.config';
import { HandlerResolver } from 'packages/handler';
import { AuthResolver } from './auth/auth.module';
import { UserResolver } from './user/user.module';

export const ModuleResolver = new HandlerResolver()
    .addSwaggerBuilder(ApiDocument)
    .addModules(
        AuthResolver,
        UserResolver
    );