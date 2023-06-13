import { type } from "os";
import { ChatRoomMember } from "src/chat-room-member/chat-room-member.entity";
import { Users } from "src/users/users.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'chat_room', schema: 'db_social_network'})
export class ChatRoom extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    create_at: Date

    @Column()
    room_name: string

    @Column()
    room_type: string

    @OneToMany(type=>ChatRoomMember, chatRoomMember=>chatRoomMember.chatRoom)
    chatRoomMember: ChatRoomMember[]

    @ManyToOne(type=>Users, create_by=>create_by.id)
    @JoinColumn({name: 'create_by', referencedColumnName: 'id'})
    create_by: Users
}