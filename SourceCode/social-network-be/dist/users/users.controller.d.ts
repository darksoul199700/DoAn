import { ChangePasswordDto } from './dto/change-password.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user';
import { UsersService } from './users.service';
export declare class UsersController {
    private userService;
    constructor(userService: UsersService);
    createUser(createUserDto: CreateUserDto): Promise<"Register fail" | {
        code: number;
        message: import("../common/message/message.enum").ERROR;
        data: import("./users.entity").Users;
    } | {
        code: number;
        message: import("../common/message/message.enum").SUCCESSFULL;
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
    getAllUser(req: any): Promise<{
        code: number;
        data: import("./users.entity").Users[];
    }>;
    changePassword(changePasswordDto: ChangePasswordDto, req: any): Promise<{
        code: number;
        message: string;
    }>;
}
