import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageGateway } from './message.gateway';
import {MessageController} from './message.controller'
import { ChatRoomModule } from 'src/chat-room/chat-room.module';
import { ChatRoomService } from 'src/chat-room/chat-room.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatRoomRepository } from 'src/chat-room/chat-room.repository';
import { ChatRoomMemberRepository } from 'src/chat-room-member/chat-room-member.repository';
import { ChatRoomMemberService } from 'src/chat-room-member/chat-room-member.service';
import { MessageRepository } from './message.repository'

@Module({
  imports: [ChatRoomModule, TypeOrmModule.forFeature([ChatRoomRepository, ChatRoomMemberRepository, MessageRepository])],
  controllers: [MessageController],
  providers: [MessageService, MessageGateway, ChatRoomService, ChatRoomMemberService],
})
export class MessageModule {}
