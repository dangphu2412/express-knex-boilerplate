import { ConfigService } from 'packages/config/config.service';
import { SwaggerBuilder } from '../../packages/swagger';

const options = {
    openapi: '3.0.1',
    info: {
        version: '1.0.0',
        title: 'APIs Document',
        description: 'API description',
        termsOfService: '',
        contact: {
            name: 'Backend S-group',
            email: 'dangphu241299@gmail.com',
        },
    },
    servers: [
        {
            url: `${ConfigService.get('HOST')}/api`,
            description: 'Local server',
            variables: {
                env: {
                    default: 'app-dev',
                    description: 'DEV Environment',
                },
                port: {
                    enum: [
                        '8443',
                        '5000',
                        '443',
                    ],
                    default: ConfigService.get('PORT'),
                },
                basePath: {
                    default: 'api',
                },
            },
        }
    ],
    basePath: '/api',
    auth: true,
};

export const ApiDocument = SwaggerBuilder.builder().addConfig(options);
