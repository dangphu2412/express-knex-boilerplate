import { ApiDocument } from 'core/config/swagger.config';
import { SwaggerDocument } from 'packages/swagger';

ApiDocument.addModel('LoginDTO',
    {
        username: SwaggerDocument.ApiProperty({ type: 'string' }),
        password: SwaggerDocument.ApiProperty({ type: 'string' })
    });

export const LoginDto = body => ({
    username: body.username,
    password: body.password
});
