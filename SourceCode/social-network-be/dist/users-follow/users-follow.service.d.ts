import { Users } from 'src/users/users.entity';
import { UsersFollowDto } from './dto/users-follow.dto';
import { UsersFollowRepository } from './users-follow.repository';
export declare class UsersFollowService {
    private usersFollowRepository;
    constructor(usersFollowRepository: UsersFollowRepository);
    followAUsers(usersFollowDto: UsersFollowDto, users: Users): Promise<{
        code: number;
        message: string;
    }>;
    getAllFollow(users: Users): Promise<{
        code: number;
        data: Users[];
        message?: undefined;
    } | {
        code: number;
        message: string;
        data?: undefined;
    }>;
}
