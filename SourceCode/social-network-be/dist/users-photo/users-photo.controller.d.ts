/// <reference types="multer" />
import { UsersPhotoDto } from './dto/users-photo.dto';
import { UsersPhotoService } from './users-photo.service';
export declare class UsersPhotoController {
    private usersPhotoService;
    constructor(usersPhotoService: UsersPhotoService);
    uploadUserPhoto(usersPhotoDto: UsersPhotoDto, req: any): Promise<{
        code: number;
        message: string;
    }>;
    getUserPhotoUrl(req: any): Promise<{
        photoUrl: string;
    }>;
    uploadUserPhotoToServer(file: Express.Multer.File): {
        code: number;
        url: string;
    };
}
