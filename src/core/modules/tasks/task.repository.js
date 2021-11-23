import { Model } from 'objection';

export class TaskRepository extends Model {
    static get tableName() {
        return 'tasks';
    }
}
