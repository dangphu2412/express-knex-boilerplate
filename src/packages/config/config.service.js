import * as env from 'dotenv';
import { NotFoundEnvKey } from './error/notfound-env-key';

export class ConfigService {
    static config(config) {
        env.config({
            path: config.pathLookup,
        });
    }

    /**
    *
    * @param {string} key
    * @returns {string}
    */
    static get(key) {
        if (!process.env[key]) {
            throw new NotFoundEnvKey(key, process.env.NODE_ENV);
        }
        return process.env[key];
    }

    static getOptional(key) {
        if (!process.env[key]) {
            return null;
        }
        return process.env[key];
    }

    static getInt(key) {
        return +ConfigService.get(key);
    }

    static getBoolean(key) {
        return !!ConfigService.get(key);
    }
}
