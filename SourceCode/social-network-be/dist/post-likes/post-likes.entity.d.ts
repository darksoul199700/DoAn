import { UsersPost } from "src/users-post/users-post.entity";
import { Users } from "src/users/users.entity";
import { BaseEntity } from "typeorm";
export declare class PostLike extends BaseEntity {
    id: number;
    usersPost: UsersPost;
    usersLikeId: number;
    users: Users;
    create_at: Date;
    is_unlike: boolean;
}
