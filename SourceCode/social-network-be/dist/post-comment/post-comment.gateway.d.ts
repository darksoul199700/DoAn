import { OnGatewayConnection, OnGatewayDisconnect } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
export declare class PostCommentGateway implements OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    handleConnection(): void;
    handleDisconnect(): void;
    onComment(client: Socket, message: {
        messages: string;
        sender: string;
        post: number;
    }): Promise<void>;
}
