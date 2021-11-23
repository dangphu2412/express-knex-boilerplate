import { Model } from 'objection';

export class RoleRepository extends Model {
    static get tableName() {
        return 'users';
    }

    static get relationMappings() {
        return {
        };
    }
}
