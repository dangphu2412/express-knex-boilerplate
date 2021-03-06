import { LoggerFactory } from 'packages/logger/factory/logger.factory';
import { sign, decode } from 'jsonwebtoken';
import { ConfigService } from 'packages/config/config.service';

class JwtServiceImpl {
    secret = ConfigService.get('JWT_SECRET');

    expiresIn = ConfigService.get('EXPIRE_DAYS');

    constructor() {
        LoggerFactory.log.info('[JwtService] is bundling');
    }

    sign(payload) {
        return sign(payload, this.secret, {
            expiresIn: this.expiresIn
        });
    }

    decode(token) {
        return decode(token);
    }
}

export const JwtService = new JwtServiceImpl();
