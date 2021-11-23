import { UserService } from 'core/modules/users/user.service';
import { getUserContext } from 'packages/authModel/module/user';
import { ValidHttpResponse } from 'packages/handler';

class Controller {
    constructor() {
        this.userService = UserService;
    }

    findAll = async () => ValidHttpResponse.toOkResponse(await this.userService.findAll())

    createOne = async req => ValidHttpResponse.toCreatedResponse(await this.userService.createOne(req.body))

    updateSelf = async req => {
        await this.userService.updateSelf(getUserContext(req), req.body);
        return ValidHttpResponse.toNoContentResponse();
    }
}

export const UserController = new Controller();
