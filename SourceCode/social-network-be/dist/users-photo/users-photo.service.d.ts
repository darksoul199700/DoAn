import { Users } from 'src/users/users.entity';
import { UsersPhotoDto } from './dto/users-photo.dto';
import { UsersPhotoRepository } from './users-photo.repository';
export declare class UsersPhotoService {
    private usersPhotoRepository;
    constructor(usersPhotoRepository: UsersPhotoRepository);
    uploadUsersPhoto(usersPhotoDto: UsersPhotoDto, users: Users): Promise<{
        code: number;
        message: string;
    }>;
    getUserPhotoUrl(users: Users): Promise<{
        photoUrl: string;
    }>;
}
