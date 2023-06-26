import { CreateUsersDetailDto } from './dto/users_detail.dto';
import { UsersDetailService } from './users-detail.service';
export declare class UsersDetailController {
    private usersDetailService;
    constructor(usersDetailService: UsersDetailService);
    createUsersDetail(createUsersDetailDto: CreateUsersDetailDto, req: any): Promise<{
        code: number;
        message: string;
    }>;
    getUserDetail(req: any): Promise<{
        code: number;
        data: import("./users-detail.entity").UsersDetail;
        message?: undefined;
        userInfo?: undefined;
    } | {
        code: number;
        message: string;
        userInfo: import("../users/users.entity").Users;
        data?: undefined;
    }>;
    getUserDetailById(usersId: number): Promise<{
        code: number;
        data: import("../users/users.entity").Users;
        message?: undefined;
    } | {
        code: number;
        message: string;
        data?: undefined;
    }>;
}
