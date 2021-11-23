import { Model } from 'objection';

export class RoleRepository extends Model {
    static get tableName() {
        return 'roles';
    }
}
