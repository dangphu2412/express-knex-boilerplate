import { BcryptService } from 'core/modules/auth/service/bcrypt.service';
import { LoggerFactory } from 'packages/logger';
import { UserAssembler } from './user.assembler';
import { UserRepository } from './user.repository';

class UserServiceImpl {
    constructor() {
        this.bcryptService = BcryptService;
        this.logger = LoggerFactory.create(UserServiceImpl.name);
        this.userRepository = UserRepository;
        this.userAssembler = UserAssembler;
    }

    findAll() {
        return this.userRepository.query()
            .withGraphJoined('roles')
            .page(0, 20);
    }

    findByUsername(username) {
        return this.userRepository.query()
            .where('username', '=', username).first();
    }

    register(registerDTO) {
        return this.userRepository.query().insertAndFetch(
            this.userAssembler.convertToEntity(registerDTO)
        );
    }
}

export const UserService = new UserServiceImpl();
