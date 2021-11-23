import { SwaggerDocument } from '../../../../packages/swagger';
import { ApiDocument } from '../../../config/swagger.config';

ApiDocument.addModel('CreateUserDTO',
    {
        email: SwaggerDocument.ApiProperty({ type: 'string' }),
        password: SwaggerDocument.ApiProperty({ type: 'string' }),
        status: SwaggerDocument.ApiProperty({ type: 'string' }),
        avatar: SwaggerDocument.ApiProperty({ type: 'string' }),
    });

export const CreateUserDTO = body => ({
    email: body.email,
    password: body.password,
    fingerprint: body.fingerprint,
    status: body.status,
    avatar: body.avatar
});
