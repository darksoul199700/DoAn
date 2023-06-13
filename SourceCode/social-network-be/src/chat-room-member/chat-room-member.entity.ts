import { type } from "os";
import { ChatRoom } from "src/chat-room/chat-room.entity";
import { Message } from "src/message/message.entity";
import { Users } from "src/users/users.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'chat_room_member', schema: 'db_social_network'})
export class ChatRoomMember extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nick_name: string

    @ManyToOne(type=>Users, users=>users.id)
    @JoinColumn({name: 'user_id', referencedColumnName: 'id'})
    member: Users

    @ManyToOne(type=>ChatRoom, chatRoom=>chatRoom.id)
    @JoinColumn({name: 'chat_room_id', referencedColumnName: 'id'})
    chatRoom: ChatRoom

    @OneToMany(type=>Message, message=>message.chatRoomMember)
    message: Message[]
}