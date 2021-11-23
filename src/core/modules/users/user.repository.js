import { Model } from 'objection';
import { RoleRepository } from '../roles/role.repository';

export class UserRepository extends Model {
    static get tableName() {
        return 'users';
    }

    static get relationMappings() {
        return {
            roles: {
                relation: Model.ManyToManyRelation,
                modelClass: RoleRepository,
                join: {
                    from: 'users.id',
                    through: {
                        from: 'users_roles.users_id',
                        to: 'users_roles.roles_id'
                    },
                    to: 'roles.id'
                }
            }
        };
    }
}
