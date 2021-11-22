import { UserService } from 'core/modules/user';

class Controller {
    constructor() {
        this.service = UserService;
    }
}

export const UserController = new Controller();
