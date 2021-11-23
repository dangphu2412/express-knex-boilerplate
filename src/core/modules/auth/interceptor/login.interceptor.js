import { InputInterceptor } from 'core/infrastructure/interceptor/input.interceptor';
import Joi from 'joi';
import { JoiUtils } from '../../../utils';

export const LoginInterceptor = new InputInterceptor(
    Joi.object({
        username: JoiUtils.requiredString().required(),
        password: JoiUtils.password().required(),
    })
);
