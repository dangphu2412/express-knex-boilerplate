import { decode } from 'jsonwebtoken';
import { UnAuthorizedException } from '../../../httpException';
import { AUTH_CONTEXT } from '../../common/enum/authContext';

export class JwtValidator {
    #accessToken;

    #payload;

    constructor(token) {
        if (token) {
            this.#accessToken = token.startsWith(AUTH_CONTEXT.PREFIX_HEADER)
                ? token.slice(7)
                : token;
        }
    }

    validate() {
        if (this.#accessToken) {
            try {
                this.#payload = decode(this.#accessToken);
            } catch (e) {
                throw new UnAuthorizedException();
            }
        }
        return this;
    }

    getPayload() {
        return this.#payload;
    }
}
