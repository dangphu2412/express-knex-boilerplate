import { createLogger as create } from 'winston';
import { OutputFormat } from '../format/output.format';
import { TransportGenerator } from '../enum/transport.enum';
import { TransportFactory } from './transport.factory';
import { FileOutputFormat } from '../format/file.format';

export class LoggerFactory {
    static log = LoggerFactory.create();

    static create(name) {
        return LoggerFactory.createByTransports(
            TransportFactory.create(
                TransportGenerator.Console,
                new OutputFormat(name)
            )
        );
    }

    /**
     *
     * @param  {...import('winston').transports.Transports} transports
     */
    static createByTransports(...transports) {
        return create({ transports });
    }

    static createFileLog(name) {
        return LoggerFactory.createByTransports(
            TransportFactory.create(
                TransportGenerator.File, new FileOutputFormat(name)
            )
        );
    }
}
