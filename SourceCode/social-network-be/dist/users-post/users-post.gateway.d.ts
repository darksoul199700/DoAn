import { OnGatewayConnection, OnGatewayDisconnect } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { UsersNotificationService } from "src/users-notification/users-notification.service";
export declare class UsersPostGateWay implements OnGatewayConnection, OnGatewayDisconnect {
    private usersNotificationService;
    constructor(usersNotificationService: UsersNotificationService);
    server: Server;
    handleConnection(): void;
    handleDisconnect(): void;
    sendNotification(client: Socket, message: {
        senderId: number;
        sender: string;
        postContent: string;
        postId: number;
    }): Promise<void>;
}
