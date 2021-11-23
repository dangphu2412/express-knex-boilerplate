import { InputInterceptor } from 'core/infrastructure/interceptor/input.interceptor';
import Joi from 'joi';
import { JoiUtils } from '../../../utils/joi.util';

export const RegisterInterceptor = new InputInterceptor(
    Joi.object({
        username: JoiUtils.requiredString(),
        email: JoiUtils.email().required(),
        fullName: JoiUtils.requiredString(),
        password: JoiUtils.requiredString(),
    })
);
