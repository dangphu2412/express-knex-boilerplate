// @ts-check
import { InvalidFilter, InvalidResolver } from 'core/common/exceptions/system';
import cors from 'cors';
import debug from 'debug';
import express from 'express';
import http from 'http';
import methodOverride from 'method-override';
import { LoggerFactory } from 'packages/logger/factory/logger.factory';
import { ArrayUtils } from 'packages/utils/array.util';
import swaggerUi from 'swagger-ui-express';

/**
 * @typedef Filter
 * @property {(req, res, next) => {}} filter
 */

export class FSFactory {
    app;

    _prefixPath = '/api';

    _swaggerPath = '/docs';

    _corsOrigins = '*';

    constructor() {
        LoggerFactory.log.info('App is starting bundling');
    }

    /**
     * Setup default config
     */
    static create() {
        const instance = new FSFactory();
        instance.app = express();

        LoggerFactory.log.info(`Allow origins: ${instance._corsOrigins.toString()}`);

        instance.app.use(cors({
            origin: instance._corsOrigins,
            optionsSuccessStatus: 200
        }));
        instance.app.use(express.json());
        instance.app.use(express.urlencoded({ extended: false }));

        /**
         * Setup method override method to use PUT, PATCH,...
         */
        instance.app.use(methodOverride('X-HTTP-Method-Override'));
        instance.app.use(
            methodOverride(req => {
                if (req.body && typeof req.body === 'object' && '_method' in req.body) {
                    const method = req.body._method;
                    delete req.body._method;

                    return method;
                }

                return undefined;
            }),
        );
        return instance;
    }

    setGlobalPrefix(path) {
        this._prefixPath = path;
        return this;
    }

    setCorsOrigins(origins) {
        if (ArrayUtils.isEmpty(origins)) {
            throw new Error('Cors origins should be an array of string');
        }
        this._corsOrigins = origins;
        return this;
    }

    applyResolver(resolver) {
        if (!resolver['resolve']) {
            throw new InvalidResolver(resolver);
        }
        this.app.use(this._prefixPath, resolver.resolve());
        return this;
    }

    /**
     *
     * @param {[Filter]} filters
     * Filter will be apply follow by the priority you put in parameters
     * @returns {FSFactory}
     */
    applyGlobalFilters(filters) {
        filters.forEach(filter => {
            if (filter['filter']) {
                this.app.use(filter.filter);
            } else {
                throw new InvalidFilter(filter);
            }
        });
        return this;
    }

    applySwagger(swaggerBuilder) {
        this.app.use(
            this._swaggerPath,
            swaggerUi.serve,
            swaggerUi.setup(swaggerBuilder.instance)
        );
        LoggerFactory.log.info('Building swagger');
        return this;
    }

    async run(port) {
        const server = http.createServer(this.app);
        server.listen(port, () => {
            LoggerFactory.log.info(`Server is listening on ${port}`);
        });

        server.on('error', error => {
            // @ts-ignore
            if (error.syscall !== 'listen') {
                throw error;
            }

            const bind = typeof port === 'string'
                ? `Pipe ${port}`
                : `Port ${port}`;

            // handle specific listen errors with friendly messages
            // @ts-ignore
            switch (error.code) {
                case 'EACCES':
                    LoggerFactory.log.error(`${bind} requires elevated privileges`);
                    process.exit(1);
                    break;
                case 'EADDRINUSE':
                    LoggerFactory.log.error(`${bind} is already in use`);
                    process.exit(1);
                    break;
                default:
                    throw error;
            }
        });

        server.on('listening', () => {
            const debugHelper = debug('node:server');
            const addr = server.address();
            const bind = typeof addr === 'string'
                ? `pipe ${addr}`
                : `port ${addr.port}`;
            debugHelper(`Listening on ${bind}`);
        });
    }
}
