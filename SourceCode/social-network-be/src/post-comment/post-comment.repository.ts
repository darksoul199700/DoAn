import { Repository, EntityRepository } from "typeorm";
import { PostComment } from "./post-comment.entity";

@EntityRepository(PostComment)
export class PostCommentRepository extends Repository<PostComment>{

}