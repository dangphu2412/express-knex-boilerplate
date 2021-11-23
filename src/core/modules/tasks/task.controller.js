import { TaskService } from './task.service';

class Controller {
    constructor() {
        this.taskService = TaskService;
    }
}

export const TaskController = new Controller();
