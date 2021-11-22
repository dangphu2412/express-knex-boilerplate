import { HandlerResolver } from 'packages/handler/HandlerResolver';
import { ApiDocument } from '../config/swagger.config';
import { AuthResolver } from './auth';
import { UserResolver } from './user';

export const ModuleResolver = HandlerResolver
    .builder()
    .addSwaggerBuilder(ApiDocument)
    .addModule([
        UserResolver,
        AuthResolver,
    ]);
