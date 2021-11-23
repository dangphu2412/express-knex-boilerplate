import { ApiDocument } from 'core/config/swagger.config';
import { SwaggerDocument } from 'packages/swagger';

ApiDocument.addModel('RegisterDTO',
    {
        username: SwaggerDocument.ApiProperty({ type: 'string' }),
        email: SwaggerDocument.ApiProperty({ type: 'string' }),
        password: SwaggerDocument.ApiProperty({ type: 'string' }),
        fullName: SwaggerDocument.ApiProperty({ type: 'string' })
    });

export const RegisterDTO = body => ({
    username: body.username,
    email: body.email,
    password: body.password,
    fullName: body.fullName
});
