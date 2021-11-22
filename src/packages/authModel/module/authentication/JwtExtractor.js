import { decode } from 'jsonwebtoken';
import { UnAuthorizedException } from '../../../httpException';
import { AUTH_CONTEXT } from '../../common/enum/authContext';

export class JwtExtractor {
    #accessToken;

    #payload;

    constructor(token) {
        if (token) {
            this.#accessToken = token.startsWith(AUTH_CONTEXT.PREFIX_HEADER)
                ? token.slice(AUTH_CONTEXT.PREFIX_HEADER.length)
                : token;
        }
    }

    extract() {
        if (this.#accessToken) {
            try {
                this.#payload = decode(this.#accessToken);
            } catch (e) {
                throw new UnAuthorizedException();
            }
        }
        return this.#payload;
    }
}
