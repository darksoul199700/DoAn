import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatRoomRepository } from 'src/chat-room/chat-room.repository';
import { ChatRoomService } from 'src/chat-room/chat-room.service';
import { ChatRoomMemberController } from './chat-room-member.controller';
import { ChatRoomMemberRepository } from './chat-room-member.repository';
import { ChatRoomMemberService } from './chat-room-member.service';

@Module({
    imports: [TypeOrmModule.forFeature([ChatRoomMemberRepository])],
    controllers: [ChatRoomMemberController],
    providers: [ChatRoomMemberService],
    exports: [ChatRoomMemberService]
})
export class ChatRoomMemberModule {}
