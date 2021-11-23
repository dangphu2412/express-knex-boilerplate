import { ValidHttpResponse } from 'packages/handler/response';
import { LoginDto } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { AuthService } from './service/auth.service';

class AuthControllerImpl {
    constructor() {
        this.service = AuthService;
    }

    login = async req => {
        const data = await this.service.login(LoginDto(req.body));
        return ValidHttpResponse.toOkResponse(data);
    }

    register = async req => {
        const data = await this.service.register(RegisterDTO(req.body));
        return ValidHttpResponse.toOkResponse(data);
    }
}

export const AuthController = new AuthControllerImpl();
