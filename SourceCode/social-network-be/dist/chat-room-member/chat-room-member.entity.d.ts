import { ChatRoom } from "src/chat-room/chat-room.entity";
import { Message } from "src/message/message.entity";
import { Users } from "src/users/users.entity";
import { BaseEntity } from "typeorm";
export declare class ChatRoomMember extends BaseEntity {
    id: number;
    nick_name: string;
    member: Users;
    chatRoom: ChatRoom;
    message: Message[];
}
