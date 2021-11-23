import { ApiDocument } from 'core/config/swagger.config';
import { HandlerResolver } from 'packages/handler';
import { AuthResolver } from './auth/auth.module';
import { TaskResolver } from './tasks/task.module';
import { UserResolver } from './users/user.module';

export const ModuleResolver = new HandlerResolver()
    .addSwaggerBuilder(ApiDocument)
    .addModules(
        AuthResolver,
        UserResolver,
        TaskResolver
    );
