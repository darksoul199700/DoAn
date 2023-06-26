import { ChatRoom } from 'src/chat-room/chat-room.entity';
import { Users } from 'src/users/users.entity';
import { ChatRoomMemberRepository } from './chat-room-member.repository';
export declare class ChatRoomMemberService {
    private chatRoomMemberRepository;
    constructor(chatRoomMemberRepository: ChatRoomMemberRepository);
    createChatRoomMember(nickname: string, users: Users, chatRoom: ChatRoom): Promise<void>;
}
