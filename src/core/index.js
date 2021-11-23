import { SecurityFilter } from 'packages/authModel/core/security/SecurityFilter';
import { ConfigService } from 'packages/config';
import { InvalidUrlFilter } from 'packages/handler/filter/InvalidUrlFilter';
import { FSFactory } from 'packages/handler/FSFactory';
import { HttpExceptionFilter } from 'packages/httpException/HttpExceptionFilter';
import { LoggerFactory } from 'packages/logger';
import { OrmProvider } from 'packages/orm/config';
import './config/config-service.config';
import { CORS_ORIGIN } from './config/cors.config';
import './config/restBuilder.config';
import { ApiDocument } from './config/swagger.config';
import { ModuleResolver } from './modules';
import config from '../../knexfile';

(async () => {
    const app = FSFactory.create();

    OrmProvider.setup(config[ConfigService.get('NODE_ENV')]);

    await app
        .setGlobalPrefix('/api')
        .setCorsOrigins(CORS_ORIGIN)
        .applyGlobalFilters([new SecurityFilter()])
        .applyResolver(ModuleResolver)
        .applySwagger(ApiDocument)
        .applyGlobalFilters([new HttpExceptionFilter(), new InvalidUrlFilter()])
        .run(ConfigService.get('PORT'));

    LoggerFactory.log.info(`Application is in mode [${ConfigService.get('NODE_ENV')}]`);
})();
