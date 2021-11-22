// @ts-check
import { compare, hash, genSalt } from 'bcrypt';
import { LoggerFactory } from 'packages/logger/factory';
import { ConfigService } from 'packages/config/config.service';
import { UnAuthorizedException } from 'packages/httpException';

class BcryptServiceImpl {
    static DEFAULT_MSG_INCOMPATIBLE_PWD = 'Your current password is incorrect';

    saltRounds;

    constructor() {
        this.saltRounds = ConfigService.getInt('SALT_ROUNDS');
        LoggerFactory.log.info(`[${BcryptServiceImpl.name}] is bundling`);
    }

    /**
     * @param {string} str normal string
     * @param {string} hashed hashed string
     */
    compare(str, hashed) {
        return compare(str, hashed);
    }

    /**
     * @param {string} str to be hashed
     */
    async hash(str) {
        const salt = await genSalt(this.saltRounds);
        return hash(str, salt);
    }

    async verifyComparison(str, hashed, msg = BcryptServiceImpl.DEFAULT_MSG_INCOMPATIBLE_PWD) {
        if (!await this.compare(str, hashed)) {
            throw new UnAuthorizedException(msg);
        }
    }
}

export const BcryptService = new BcryptServiceImpl();
