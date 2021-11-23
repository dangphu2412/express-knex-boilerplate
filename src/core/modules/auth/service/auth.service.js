import pick from 'lodash/pick';
import { UnAuthorizedException } from 'packages/httpException';
import { LoggerFactory } from 'packages/logger';
import { UserService } from '../../users/user.service';
import { BcryptService } from './bcrypt.service';
import { JwtService } from './jwt.service';

class AuthServiceImpl {
    constructor() {
        this.bcryptService = BcryptService;
        this.jwtService = JwtService;
        this.userService = UserService;
        LoggerFactory.log.info(`[${AuthServiceImpl.name}] is bundling`);
    }

    async login(loginDTO) {
        const { username, password } = loginDTO;

        const user = await this.userService.findByUsername(username);

        if (!user || !(await this.bcryptService.compare(password, user.password))) {
            throw new UnAuthorizedException('Your username or password is incorrect');
        }

        return {
            accessToken: this.jwtService.sign({ id: user.id }),
            info: this._getUserInfo(user)
        };
    }

    async register(registerDTO) {
        const { username } = registerDTO;

        const user = await this.userService.findByUsername(username);

        if (user) {
            throw new UnAuthorizedException('Your username has been registerd');
        }

        registerDTO.password = await this.bcryptService.hash(registerDTO.password);

        const userAfterRegister = await this.userService.register(registerDTO);

        return {
            accessToken: this.jwtService.sign({ id: userAfterRegister.id }),
            info: this._getUserInfo(userAfterRegister)
        };
    }

    _getUserInfo = user => pick(user, ['id', 'email']);
}

export const AuthService = new AuthServiceImpl();
