import { AUTH_CONTEXT } from '../../common/enum/authContext';
import { JwtValidator } from './JwtValidator';
import { InvalidInstance } from '../../exceptions/InvalidInstance';
import { UserDetail } from '../user/UserDetail';

export class JwtAuthAdapter {
    static USER_DETAIL_CLASS = UserDetail;

    #userDetail;

    static applyCustomUserDetail(customUserDetailClass) {
        if (customUserDetailClass instanceof UserDetail) {
            JwtAuthAdapter.USER_DETAIL_CLASS = customUserDetailClass;
        } else {
            throw new InvalidInstance(customUserDetailClass, JwtAuthAdapter.USER_DETAIL_CLASS);
        }
    }

    #attachAuthContextToReq = req => {
        if (this.#userDetail) {
            req[AUTH_CONTEXT.KEY_AUTH_CONTEXT] = this.#userDetail;
        }
    }

    #applyPreAuthorizationToUserDetail = () => {
        this.#userDetail.toRoles();
        this.#userDetail.toPermissions();
    }

    adapt(req) {
        const token = req.headers[AUTH_CONTEXT.AUTHORIZATION_HEADER];
        if (token) {
            const body = new JwtValidator(token)
                .validate()
                .getPayload();

            this.#userDetail = new JwtAuthAdapter.USER_DETAIL_CLASS(body);
            this.#applyPreAuthorizationToUserDetail();
            this.#attachAuthContextToReq(req);
        }
    }
}
