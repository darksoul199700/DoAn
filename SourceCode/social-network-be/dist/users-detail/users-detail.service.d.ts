import { Users } from 'src/users/users.entity';
import { CreateUsersDetailDto } from './dto/users_detail.dto';
import { UsersDetail } from './users-detail.entity';
import { UsersDetailRepository } from './users-detail.repository';
import { UserRepository } from 'src/users/users.repository';
export declare class UsersDetailService {
    private usersDetailRepository;
    private userRepository;
    constructor(usersDetailRepository: UsersDetailRepository, userRepository: UserRepository);
    createUsersDetail(CreateUsersDetailDto: CreateUsersDetailDto, users: Users): Promise<{
        code: number;
        message: string;
    }>;
    getUserDetail(users: Users): Promise<{
        code: number;
        data: UsersDetail;
        message?: undefined;
        userInfo?: undefined;
    } | {
        code: number;
        message: string;
        userInfo: Users;
        data?: undefined;
    }>;
    getUserDetailById(usersId: number): Promise<{
        code: number;
        data: Users;
        message?: undefined;
    } | {
        code: number;
        message: string;
        data?: undefined;
    }>;
}
