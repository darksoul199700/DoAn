import { Repository, EntityRepository } from "typeorm";
import { UsersPost } from "./users-post.entity";


@EntityRepository(UsersPost)
export class UsersPostRepository extends Repository<UsersPost>{

}