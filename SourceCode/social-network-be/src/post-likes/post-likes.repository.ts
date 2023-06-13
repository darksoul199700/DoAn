import { Repository, EntityRepository } from "typeorm";
import { PostLike } from "./post-likes.entity";

@EntityRepository(PostLike)
export class PostLikeRepository extends Repository<PostLike>{

}