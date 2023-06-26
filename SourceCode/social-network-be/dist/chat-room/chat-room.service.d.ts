import { ChatRoomMemberRepository } from 'src/chat-room-member/chat-room-member.repository';
import { ChatRoomMemberService } from 'src/chat-room-member/chat-room-member.service';
import { ChatRoomRepository } from './chat-room.repository';
import { CreateBwtChatRoomDto } from './dto/create-btw-chat-room.dto';
export declare class ChatRoomService {
    private chatRoomRepository;
    private chatRoomMemberRepository;
    private chatRoomMemberService;
    constructor(chatRoomRepository: ChatRoomRepository, chatRoomMemberRepository: ChatRoomMemberRepository, chatRoomMemberService: ChatRoomMemberService);
    createBwtFriendChatRoom(createBtwChatRoomDto: CreateBwtChatRoomDto): Promise<{
        code: number;
        data: number;
        message: string;
    }>;
}
