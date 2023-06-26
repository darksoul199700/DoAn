import { UsersNotification } from './users-notification.entity';
import { UsersNotificationRepository } from './users-notification.repository';
export declare class UsersNotificationService {
    private usersNotificationRepository;
    constructor(usersNotificationRepository: UsersNotificationRepository);
    addUsersNotification(no_content: string, type: string, postId: number, usersId: number): Promise<void>;
    getAllUsersNotification(usersId: number): Promise<{
        code: number;
        data: UsersNotification[];
        count: number;
        message?: undefined;
    } | {
        code: number;
        message: string;
        data?: undefined;
        count?: undefined;
    }>;
    readNotification(id: number): Promise<{
        code: number;
    }>;
}
