import { InputInterceptor } from 'core/infrastructure/interceptor/input.interceptor';
import Joi from 'joi';
import { JoiUtils } from '../../../utils';

export const loginInterceptor = new InputInterceptor(
    Joi.object({
        email: JoiUtils.email().required(),
        password: JoiUtils.password().required(),
    })
);
