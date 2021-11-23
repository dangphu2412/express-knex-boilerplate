import { LoggerFactory } from 'packages/logger';
import { TaskRepository } from './task.repository';

class TaskServiceImpl {
    constructor() {
        this.logger = LoggerFactory.create(TaskServiceImpl.name);
        this.taskRepository = TaskRepository;
    }
}

export const TaskService = new TaskServiceImpl();
