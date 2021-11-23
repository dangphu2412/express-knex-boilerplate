import { BcryptService } from 'core/modules/auth/service/bcrypt.service';
import { LoggerFactory } from 'packages/logger';
import { UserRepository } from './user.repository';

class UserServiceImpl {
    constructor() {
        this.bcryptService = BcryptService;
        this.logger = LoggerFactory.create(UserServiceImpl.name);
        this.userRepository = UserRepository;
    }

    findAll() {
        return this.userRepository.query();
    }
}

export const UserService = new UserServiceImpl();
