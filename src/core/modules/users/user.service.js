import { BcryptService } from 'core/modules/auth/service/bcrypt.service';
import { LoggerFactory } from 'packages/logger';
import { SearchCriteria } from 'packages/query/core/search-criteria';
import { RoleMasks } from '../roles/role.enum';
import { RoleLoader } from '../roles/role.loader';
import { UserAssembler } from './user.assembler';
import { UserRepository } from './user.repository';

class UserServiceImpl {
    constructor() {
        this.bcryptService = BcryptService;
        this.logger = LoggerFactory.create(UserServiceImpl.name);
        this.userRepository = UserRepository;
        this.userAssembler = UserAssembler;
        this.roleLoader = RoleLoader;
    }

    async findAll(query) {
        const search = SearchCriteria.create(query);
        search.interceptQuery({
            sorts: {
                allowFields: ['fullName', 'username']
            },
            filters: {
                allowFields: ['fullName']
            }
        });

        const users = await this.userRepository.query()
            .whereIn('users.id',
                builder => {
                    builder.select('users.id').from('users')
                        .leftJoin('users_roles', 'users_roles.users_id', 'users.id')
                        .leftJoin('roles', 'users_roles.roles_id', 'roles.id')
                        .groupBy('users.id')
                        .page(search.page, search.limit);
                })
            .withGraphJoined('roles');

        return users;
    }

    findByUsername(username) {
        return this.userRepository.query()
            .where('username', '=', username).first();
    }

    async register(registerDTO) {
        const viewerRole = await this.roleLoader.getRoleByName(RoleMasks.Viewer);

        const user = await this.userRepository.query().insertAndFetch(
            this.userAssembler.convertToEntity(registerDTO)
        );

        await user.$relatedQuery('roles').relate(viewerRole);

        return user;
    }
}

export const UserService = new UserServiceImpl();
