import { Injectable } from '@nestjs/common';
import { ChatRoomMemberRepository } from 'src/chat-room-member/chat-room-member.repository';
import { ChatRoomMemberService } from 'src/chat-room-member/chat-room-member.service';
import { Users } from 'src/users/users.entity';
import { Brackets, getRepository } from 'typeorm';
import { ChatRoom } from './chat-room.entity';
import { ChatRoomRepository } from './chat-room.repository';
import { CreateBwtChatRoomDto } from './dto/create-btw-chat-room.dto';

@Injectable()
export class ChatRoomService {
    constructor(
        private chatRoomRepository: ChatRoomRepository,
        private chatRoomMemberRepository: ChatRoomMemberRepository,
        private chatRoomMemberService: ChatRoomMemberService
    ) {

    }
    
    async createBwtFriendChatRoom(createBtwChatRoomDto: CreateBwtChatRoomDto) {
        const {create_at, room_name, room_type, friend_id, users_id} = createBtwChatRoomDto


        const newChatRoom = new ChatRoom

        const users = await getRepository(Users).findOne({where: {id: users_id}})
        

        const friend = await getRepository(Users).findOne({where: {id: friend_id}})
        

        // const isExisChatRoom = await this.chatRoomRepository.createQueryBuilder('chatroom')
        // .where('create_by = :users OR create_by = :friend_id', {users: users_id, friend_id: friend_id})
        // .andWhere('room_type = :room_type', {room_type: room_type})
        // .leftJoin('chatroom.chatRoomMember', 'member')
        // .andWhere('member.member = :friend OR member.member =: users', {friend: friend_id, users: users_id})
        // .select([
        //     'chatroom.id',
        //     'chatroom.room_type'
        // ])
        // .getOne()

        const isExisChatRoom = await this.chatRoomRepository.createQueryBuilder('chatroom')
        .where(new Brackets(qp => {
            qp.where('create_by = :users', {users: users_id})
            .orWhere('create_by = :friend', {friend: friend_id})
        }))
        .andWhere('room_type = :room_type', {room_type: room_type})
        .leftJoin('chatroom.chatRoomMember', 'member')
        .andWhere(new Brackets(qp => {
            qp.where('member.member = :friend', {friend: friend_id})
            .orWhere('member.member = :users', {users: users_id})
        }))
        .select([
            'chatroom.id',
            'chatroom.room_type'
        ])
        .getOne()

        if(isExisChatRoom) {
            return {code: 201, data: isExisChatRoom.id, message: 'Have fun win old friend'}
        } else {
            newChatRoom.create_by = users
            newChatRoom.create_at = create_at
            newChatRoom.room_name = room_name
            newChatRoom.room_type = room_type

            await newChatRoom.save()

            await this.chatRoomMemberService.createChatRoomMember('', users, newChatRoom)
            await this.chatRoomMemberService.createChatRoomMember('', friend, newChatRoom)

            return {code: 200, message: 'create chat room success', data: newChatRoom.id}
        }
    }
}
