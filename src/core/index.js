import './config/config-service.config';
import './config/restBuilder.config';
import express from 'express';
import { SecurityFilter } from 'packages/authModel/core/security/SecurityFilter';
import { InvalidUrlFilter } from 'packages/handler/filter/InvalidUrlFilter';
import { HttpExceptionFilter } from 'packages/httpException/HttpExceptionFilter';
import { ModuleResolver } from './api';
import { AppBundle } from './config';
import { ApiDocument } from './config/swagger.config';

const app = express();

(async () => {
    await AppBundle
        .builder()
        .applyAppContext(app)
        .init()
        .applyGlobalFilters([new SecurityFilter()])
        .applyResolver(ModuleResolver)
        .applySwagger(ApiDocument)
        .applyGlobalFilters([new HttpExceptionFilter(), new InvalidUrlFilter()])
        .run();
})();

export default app;
