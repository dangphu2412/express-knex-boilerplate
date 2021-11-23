import { Model } from 'objection';
import Knex from 'knex';
import { LoggerFactory } from 'packages/logger';

export class OrmProvider {
    static async tryConnect(knexInstance) {
        return knexInstance.raw('SELECT 1');
    }

    static async setup(config) {
        const knexInstance = Knex(config);
        Model.knex(knexInstance);
        let retryTimes = 5;
        let needRetry = true;

        const interval = setInterval(async () => {
            if (needRetry && retryTimes > 0) {
                try {
                    await OrmProvider.tryConnect(knexInstance);
                    LoggerFactory.log.info('Database connected');
                    needRetry = false;
                } catch (e) {
                    needRetry = true;
                    retryTimes -= 1;
                    LoggerFactory.log.error(e.message);
                    LoggerFactory.log.error(e.stack);
                    if (retryTimes === 0) {
                        LoggerFactory.log.info('Stop retry connect to database. Please recheck your configurations');
                    }
                }
            } else {
                clearInterval(interval);
            }
        }, 1000);
    }
}
