import { Repository, EntityRepository } from "typeorm";
import { ChatRoomMember } from "./chat-room-member.entity";

@EntityRepository(ChatRoomMember)
export class ChatRoomMemberRepository extends Repository<ChatRoomMember>{

}