import { UsersFollowDto } from './dto/users-follow.dto';
import { UsersFollowService } from './users-follow.service';
export declare class UsersFollowController {
    private usersFollowService;
    constructor(usersFollowService: UsersFollowService);
    UsersFollow(usersFollowDto: UsersFollowDto, req: any): Promise<{
        code: number;
        message: string;
    }>;
    getAllFollow(req: any): Promise<{
        code: number;
        data: import("../users/users.entity").Users[];
        message?: undefined;
    } | {
        code: number;
        message: string;
        data?: undefined;
    }>;
}
