import { ConfigService } from 'packages/config';

export const CORS_ORIGIN = ConfigService.getOptional('CORS')
    ? ConfigService.getOptional('CORS').split(',')
    : '*';
