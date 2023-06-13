import { Repository, EntityRepository } from "typeorm";
import { ChatRoom } from "./chat-room.entity";

@EntityRepository(ChatRoom)
export class ChatRoomRepository extends Repository<ChatRoom>{

}