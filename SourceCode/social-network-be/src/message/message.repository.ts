import { Repository, EntityRepository } from "typeorm";
import { Message } from "./message.entity";

@EntityRepository(Message)
export class MessageRepository extends Repository<Message>{

}