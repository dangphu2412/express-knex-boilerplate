import './config/config-service.config';
import './config/restBuilder.config';
import express from 'express';
import { SecurityFilter } from 'packages/authModel/core/security/SecurityFilter';
import { InvalidUrlFilter } from 'packages/handler/filter/InvalidUrlFilter';
import { HttpExceptionFilter } from 'packages/httpException/HttpExceptionFilter';
import { LoggerFactory } from 'packages/logger';
import { ConfigService } from 'packages/config';
import { ModuleResolver } from './api';
import { AppBundle } from './config';
import { ApiDocument } from './config/swagger.config';
import { CORS_ORIGIN } from './config/cors.config';

const app = express();

(async () => {
    await new AppBundle()
        .setGlobalPrefix('/api')
        .setCorsOrigins(CORS_ORIGIN)
        .applyAppContext(app)
        .applyGlobalFilters([new SecurityFilter()])
        .applyResolver(ModuleResolver)
        .applySwagger(ApiDocument)
        .applyGlobalFilters([new HttpExceptionFilter(), new InvalidUrlFilter()])
        .build()
        .run(ConfigService.get('PORT'));

    LoggerFactory.log.info(`Application is in mode [${ConfigService.get('NODE_ENV')}]`);
})();

export default app;
