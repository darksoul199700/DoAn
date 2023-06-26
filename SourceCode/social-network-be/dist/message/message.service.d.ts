import { ChatRoomMemberRepository } from 'src/chat-room-member/chat-room-member.repository';
import { ChatRoomRepository } from 'src/chat-room/chat-room.repository';
import { ChatRoomService } from 'src/chat-room/chat-room.service';
import { Message } from './message.entity';
import { MessageRepository } from './message.repository';
export declare class MessageService {
    private chatRoomService;
    private chatRoomMemberRepository;
    private chatRoomRepository;
    private messageRepository;
    constructor(chatRoomService: ChatRoomService, chatRoomMemberRepository: ChatRoomMemberRepository, chatRoomRepository: ChatRoomRepository, messageRepository: MessageRepository);
    saveMessage(messages: string, create_at: Date, senderId: number, chatRoomId: number): Promise<{
        code: number;
        message: string;
    }>;
    getAllMessage(chatRoomId: number): Promise<{
        code: number;
        data: Message[];
    }>;
}
