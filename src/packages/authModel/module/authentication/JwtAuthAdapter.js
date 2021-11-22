import { AUTH_CONTEXT } from '../../common/enum/authContext';
import { JwtExtractor } from './JwtExtractor';
import { InvalidInstance } from '../../exceptions/InvalidInstance';
import { UserDetail } from '../user/UserDetail';

export class JwtAuthAdapter {
    static USER_DETAIL_CLASS = UserDetail;

    /**
     * @type {UserDetail}
     */
    #userDetail;

    static applyCustomUserDetail(customUserDetailClass) {
        if (customUserDetailClass instanceof UserDetail) {
            JwtAuthAdapter.USER_DETAIL_CLASS = customUserDetailClass;
        } else {
            throw new InvalidInstance(customUserDetailClass, JwtAuthAdapter.USER_DETAIL_CLASS);
        }
    }

    _attachAuthContextToReq = req => {
        if (this.#userDetail && this.#userDetail.areRulesDisposed()) {
            req[AUTH_CONTEXT.KEY_AUTH_CONTEXT] = this.#userDetail;
        }
    }

    _attachRulesToUserDetail = () => {
        this.#userDetail.toRoles();
        this.#userDetail.toPermissions();
        this.#userDetail.disposeRules();
    }

    adapt(req) {
        const token = req.headers[AUTH_CONTEXT.AUTHORIZATION_HEADER];
        if (token) {
            const body = new JwtExtractor(token).extract();

            this.#userDetail = new JwtAuthAdapter.USER_DETAIL_CLASS(body);
            this._attachRulesToUserDetail();
            this._attachAuthContextToReq(req);
        }
    }
}
