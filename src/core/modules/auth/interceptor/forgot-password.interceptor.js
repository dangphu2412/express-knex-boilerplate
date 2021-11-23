import { InputInterceptor } from 'core/infrastructure/interceptor';
import { JoiUtils } from 'core/utils';
import Joi from 'joi';

export const forgotPasswordInterceptor = new InputInterceptor(
    Joi.object({
        email: JoiUtils.email().required(),
    })
);
