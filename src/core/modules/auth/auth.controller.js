import { LoginDto } from 'core/modules/auth';
import { AuthService } from 'core/modules/auth/service/auth.service';
import { ValidHttpResponse } from 'packages/handler/response';

class AuthControllerImpl {
    constructor() {
        this.service = AuthService;
    }

    login = async req => {
        const data = await this.service.login(LoginDto(req.body));
        return ValidHttpResponse.toOkResponse(data);
    }
}

export const AuthController = new AuthControllerImpl();
