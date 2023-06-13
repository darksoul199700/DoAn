import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatRoomMemberModule } from 'src/chat-room-member/chat-room-member.module';
import { ChatRoomMemberRepository } from 'src/chat-room-member/chat-room-member.repository';
import { ChatRoomMemberService } from 'src/chat-room-member/chat-room-member.service';
import { ChatRoomController } from './chat-room.controller';
import { ChatRoomRepository } from './chat-room.repository';
import { ChatRoomService } from './chat-room.service';

@Module({
    imports: [TypeOrmModule.forFeature([ChatRoomRepository, ChatRoomMemberRepository]), ChatRoomMemberModule],
    controllers: [ChatRoomController],
    providers: [ChatRoomService, ChatRoomMemberService],
    exports: [ChatRoomService]
})
export class ChatRoomModule {}
