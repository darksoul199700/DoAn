import { UsersPost } from "src/users-post/users-post.entity";
import { Users } from "src/users/users.entity";
import { BaseEntity } from "typeorm";
export declare class UsersNotification extends BaseEntity {
    id: number;
    no_content: string;
    create_at: Date;
    type: string;
    is_read: boolean;
    postId: number;
    usersId: number;
    post: UsersPost;
    users: Users;
}
