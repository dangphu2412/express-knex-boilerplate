import { InputInterceptor } from 'core/infrastructure/interceptor';
import { JoiUtils } from 'core/utils';
import Joi from 'joi';

export const CreateUserInterceptor = new InputInterceptor(
    Joi.object({
        username: JoiUtils.requiredString().required(),
        password: JoiUtils.password().required(),
    })
);
