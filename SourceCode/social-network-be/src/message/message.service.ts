import { Injectable } from '@nestjs/common';
import { ChatRoomMember } from 'src/chat-room-member/chat-room-member.entity';
import { ChatRoomMemberRepository } from 'src/chat-room-member/chat-room-member.repository';
import { ChatRoomRepository } from 'src/chat-room/chat-room.repository';
import { ChatRoomService } from 'src/chat-room/chat-room.service';
import { Users } from 'src/users/users.entity';
import { getRepository } from 'typeorm';
import { isNullOrUndefined } from 'util';
import { Message } from './message.entity';
import { MessageRepository } from './message.repository';

@Injectable()
export class MessageService {
  constructor(
    private chatRoomService: ChatRoomService,
    private chatRoomMemberRepository: ChatRoomMemberRepository,
    private chatRoomRepository: ChatRoomRepository,
    private messageRepository: MessageRepository
  ){}

  async saveMessage(messages: string, create_at: Date, senderId: number, chatRoomId: number) {
    const chatRoomMember = await this.chatRoomMemberRepository.createQueryBuilder('chatRoomMember')
    .where('chatRoomMember.member = :senderId', {senderId: senderId})
    .andWhere('chatRoomMember.chatRoom = :chatRoomId', {chatRoomId: chatRoomId})
    .getMany()


    const currentTime = new Date(create_at);
    const create_at_utc = new Date(currentTime.getTime() + currentTime.getTimezoneOffset() * 60000);

    if(isNullOrUndefined(chatRoomMember[0])) {
      return {code: 201, message: 'this member not exist'}
    } else {
      const newMessage = new Message(create_at_utc, messages, chatRoomMember[0])

      await newMessage.save()
      return {code: 200, message: 'save message success'}
    }
  }

  async getAllMessage(chatRoomId: number) {

    // const query = await this.chatRoomRepository.createQueryBuilder('chatRoom')
    // .where('chatRoom.id = :chatRoomId', {chatRoomId: chatRoomId})
    // .leftJoin('chatRoom.chatRoomMember', 'chatRoomMember')
    // .leftJoin('chatRoomMember.message', 'message')
    // .select([
    //   'chatRoom.room_type',
    //   'chatRoomMember',
    //   'message.messages',
    //   'message.create_at',
    // ])
    // .orderBy('message.create_at')
    // .getMany()

    const chatRoomMember = await this.chatRoomMemberRepository.createQueryBuilder('chatRoomMember')
    .where('chatRoomMember.chatRoom = :chatRoomId', {chatRoomId: chatRoomId})
    .select([
      'chatRoomMember.id'
    ])
    .getMany()

    const listChatRoomMember = []

    chatRoomMember.map(x => {
      listChatRoomMember.push(x.id)
    })

    const query2 = await this.messageRepository.createQueryBuilder('message')
    .where('message.chatRoomMember.id IN ' + `(${listChatRoomMember})`)
    .leftJoin('message.chatRoomMember', 'chatRoomMember')
    .leftJoin('chatRoomMember.member', 'member')
    .select([
      'message.messages',
      'message.create_at',
      'chatRoomMember',
      'member.id',
    ])
    .orderBy('message.create_at','DESC')
    .getMany()

    return {code: 200, data: query2}
  }

}
