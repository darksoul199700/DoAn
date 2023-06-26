import { UsersPost } from "src/users-post/users-post.entity";
import { Users } from "src/users/users.entity";
import { BaseEntity } from "typeorm";
export declare class PostComment extends BaseEntity {
    id: number;
    create_at: Date;
    content_comment: string;
    users: Users;
    post: UsersPost;
}
