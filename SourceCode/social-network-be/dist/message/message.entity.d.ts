import { ChatRoomMember } from 'src/chat-room-member/chat-room-member.entity';
import { BaseEntity } from 'typeorm';
export declare class Message extends BaseEntity {
    constructor(create_at: Date, message: string, chatRoomMember: ChatRoomMember);
    id: number;
    messages: string;
    create_at: Date;
    chatRoomMember: ChatRoomMember;
}
