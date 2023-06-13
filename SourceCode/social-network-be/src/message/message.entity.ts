import { ChatRoomMember } from 'src/chat-room-member/chat-room-member.entity';
import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity({name: 'message', schema: 'db_social_network'})
export class Message extends BaseEntity {
  constructor(create_at: Date, message: string, chatRoomMember: ChatRoomMember) {
    super()
    this.create_at = create_at
    this.messages = message
    this.chatRoomMember = chatRoomMember
  }

  @PrimaryGeneratedColumn()
  id: number


  @Column()
  messages: string

  @Column()
  create_at: Date

  @ManyToOne(type=>ChatRoomMember, chatRoomMember=>chatRoomMember.id)
  @JoinColumn({name: 'chat_room_member_id', referencedColumnName: 'id'})
  chatRoomMember: ChatRoomMember

}
