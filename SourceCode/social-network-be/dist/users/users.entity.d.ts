import { ChatRoomMember } from "src/chat-room-member/chat-room-member.entity";
import { ChatRoom } from "src/chat-room/chat-room.entity";
import { Status } from "src/common/enum/users_status.enum";
import { PostComment } from "src/post-comment/post-comment.entity";
import { PostLike } from "src/post-likes/post-likes.entity";
import { UsersDetail } from "src/users-detail/users-detail.entity";
import { UsersFollow } from "src/users-follow/users-follow.entity";
import { UsersPhoto } from "src/users-photo/users-photo.entity";
import { UsersPost } from "src/users-post/users-post.entity";
import { BaseEntity } from "typeorm";
export declare class Users extends BaseEntity {
    id: number;
    username: string;
    password: string;
    email: string;
    status: Status;
    usersDetail: UsersDetail;
    post: UsersPost[];
    usersPhoto: UsersPhoto;
    usersFollow: UsersFollow[];
    usersHasFollow: UsersFollow[];
    postLike: PostLike[];
    comment: PostComment[];
    chatRoomMember: ChatRoomMember[];
    chatRoom: ChatRoom;
}
