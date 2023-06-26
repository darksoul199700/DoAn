import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessageService } from './message.service';
import { ChatRoomService } from 'src/chat-room/chat-room.service';
import { CreateBwtChatRoomDto } from 'src/chat-room/dto/create-btw-chat-room.dto';
export declare class MessageGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private messageService;
    private ChatRoomService;
    constructor(messageService: MessageService, ChatRoomService: ChatRoomService);
    server: Server;
    private users;
    handleConnection(): Promise<void>;
    handleDisconnect(): Promise<void>;
    handleMessage(client: Socket, message: {
        sender: string;
        sender_id: number;
        room: string;
        message: string;
        create_at: Date;
    }): Promise<void>;
    handleJoinRoom(client: Socket, createBwtChatRoomDto: CreateBwtChatRoomDto): Promise<void>;
    handleLeaveRoom(client: Socket, room: any): void;
    onChat(client: any, message: any): Promise<void>;
}
