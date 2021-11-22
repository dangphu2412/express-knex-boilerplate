import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from 'packages/config/config.service';

cloudinary.config({
    cloud_name: ConfigService.get('CLOUDINARY_NAME'),
    api_key: ConfigService.get('CLOUDINARY_API_KEY'),
    api_secret: ConfigService.get('CLOUDINARY_API_SECRET'),
    secure: true
});

export const cloudinaryUploader = cloudinary.uploader;
