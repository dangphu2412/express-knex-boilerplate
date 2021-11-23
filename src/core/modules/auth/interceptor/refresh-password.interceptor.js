import { InputInterceptor } from 'core/infrastructure/interceptor/input.interceptor';
import { JoiUtils } from 'core/utils';
import Joi from 'joi';

export const refreshPasswordInterceptor = new InputInterceptor(
    Joi.object({
        refreshPasswordToken: JoiUtils.password(true).message('refreshPasswordToken need at least 6 charaters'),
        oldPassword: JoiUtils.password(true).message('oldPassword need at least 6 charaters'),
        newPassword: JoiUtils.password(true).message('newPassword need at least 6 charaters'),
    })
);
