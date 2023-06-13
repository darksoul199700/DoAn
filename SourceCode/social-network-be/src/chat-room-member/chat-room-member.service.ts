import { Injectable } from '@nestjs/common';
import { ChatRoom } from 'src/chat-room/chat-room.entity';
import { ChatRoomService } from 'src/chat-room/chat-room.service';
import { Users } from 'src/users/users.entity';
import { getRepository } from 'typeorm';
import { ChatRoomMember } from './chat-room-member.entity';
import { ChatRoomMemberRepository } from './chat-room-member.repository';
import { createChatRoomMemberDto } from './dto/create-chat-room-member.dto';

@Injectable()
export class ChatRoomMemberService {
    constructor(
        private chatRoomMemberRepository: ChatRoomMemberRepository,
    ){}


    async createChatRoomMember(nickname: string, users: Users, chatRoom: ChatRoom) {

        const newChatRoomMember = new ChatRoomMember

        newChatRoomMember.nick_name = nickname
        newChatRoomMember.member = users
        newChatRoomMember.chatRoom = chatRoom

        await newChatRoomMember.save()
    }
}
