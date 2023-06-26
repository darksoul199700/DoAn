import { JwtService } from '@nestjs/jwt';
import { ERROR, SUCCESSFULL } from 'src/common/message/message.enum';
import { ChangePasswordDto } from './dto/change-password.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user';
import { Users } from './users.entity';
import { UserRepository } from './users.repository';
export declare class UsersService {
    private userRepository;
    private jwtService;
    constructor(userRepository: UserRepository, jwtService: JwtService);
    createUser(createUserDto: CreateUserDto): Promise<"Register fail" | {
        code: number;
        message: ERROR;
        data: Users;
    } | {
        code: number;
        message: SUCCESSFULL;
        data: null;
    }>;
    loginUser(loginUserDto: LoginUserDto): Promise<{
        code: number;
        accessToken: string;
        message: string;
    } | {
        code: number;
        message: string;
        accessToken?: undefined;
    }>;
    findOne(username: string): Promise<Users>;
    findAllUser(users: Users): Promise<{
        code: number;
        data: Users[];
    }>;
    changePassword(changePasswordDto: ChangePasswordDto, users: Users): Promise<{
        code: number;
        message: string;
    }>;
}
