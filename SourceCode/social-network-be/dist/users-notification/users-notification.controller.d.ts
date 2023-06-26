import { UsersNotificationService } from './users-notification.service';
export declare class UsersNotificationController {
    private usersNotificationService;
    constructor(usersNotificationService: UsersNotificationService);
    getAllUserNotification(req: any): Promise<{
        code: number;
        data: import("./users-notification.entity").UsersNotification[];
        count: number;
        message?: undefined;
    } | {
        code: number;
        message: string;
        data?: undefined;
        count?: undefined;
    }>;
    putReadNotification(id: number): Promise<{
        code: number;
    }>;
}
