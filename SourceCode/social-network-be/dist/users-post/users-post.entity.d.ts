import { PostComment } from "src/post-comment/post-comment.entity";
import { PostLike } from "src/post-likes/post-likes.entity";
import { Users } from "src/users/users.entity";
import { BaseEntity } from "typeorm";
export declare class UsersPost extends BaseEntity {
    id: number;
    caption: string;
    photo: JSON;
    create_at: Date;
    update_at: Date;
    is_delete: boolean;
    usersId: number;
    users: Users;
    postLike: PostLike[];
    postComment: PostComment[];
}
