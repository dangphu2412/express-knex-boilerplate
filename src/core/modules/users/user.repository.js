import { Model } from 'objection';
import { RoleRepository } from '../roles/role.repository';
import { TaskRepository } from '../tasks/task.repository';

export class UserRepository extends Model {
    static get tableName() {
        return 'users';
    }

    static relationMappings = {
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
        },
        tasks: {
            relation: Model.ManyToManyRelation,
            modelClass: TaskRepository,
            join: {
                from: 'tasks.id',
                through: {
                    from: 'users_tasks.users_id',
                    to: 'users_tasks.tasks_id'
                },
                to: 'tasks.id'
            }
        }
    };
}
