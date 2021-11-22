import pick from 'lodash/pick';
import { LoggerFactory } from 'packages/logger';
import { BcryptService } from './bcrypt.service';
import { JwtService } from './jwt.service';

class AuthServiceImpl {
    constructor() {
        this.bcryptService = BcryptService;
        this.jwtService = JwtService;
        LoggerFactory.log.info(`[${AuthServiceImpl.name}] is bundling`);
    }

    #getUserInfo = user => pick(user, ['_id', 'email', 'profile', 'roles', 'avatar', 'status', 'isPasswordChanged']);
}

export const AuthService = new AuthServiceImpl();
