import { UserService } from 'core/modules/users/user.service';
import { ValidHttpResponse } from 'packages/handler';

class Controller {
    constructor() {
        this.userService = UserService;
    }

    findAll = async () => ValidHttpResponse.toCreatedResponse(await this.userService.findAll())
}

export const UserController = new Controller();
