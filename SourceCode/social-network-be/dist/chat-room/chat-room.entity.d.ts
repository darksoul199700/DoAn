import { ChatRoomMember } from "src/chat-room-member/chat-room-member.entity";
import { Users } from "src/users/users.entity";
import { BaseEntity } from "typeorm";
export declare class ChatRoom extends BaseEntity {
    id: number;
    create_at: Date;
    room_name: string;
    room_type: string;
    chatRoomMember: ChatRoomMember[];
    create_by: Users;
}
