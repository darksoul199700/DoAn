import { ChatRoomMember } from "src/chat-room-member/chat-room-member.entity";
import { ChatRoom } from "src/chat-room/chat-room.entity";
import { Status } from "src/common/enum/users_status.enum";
import { PostComment } from "src/post-comment/post-comment.entity";
import { PostLike } from "src/post-likes/post-likes.entity";
import { UsersDetail } from "src/users-detail/users-detail.entity";
import { UsersFollow } from "src/users-follow/users-follow.entity";
import { UsersPhoto } from "src/users-photo/users-photo.entity";
import { UsersPost } from "src/users-post/users-post.entity";
import { BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity({name: 'users', schema: 'db_social_network'})
export class Users extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    email: string;

    @Column()
    status:Status;

    @OneToOne(type=>UsersDetail)
    @JoinColumn({name: 'users_detail_id', referencedColumnName: 'id'})
    usersDetail: UsersDetail;

    @OneToMany(type=>UsersPost, usersPost => usersPost.users)
    post: UsersPost[]

    @OneToOne(type=>UsersPhoto)
    @JoinColumn({name:'users_photo_id', referencedColumnName: 'id'})
    usersPhoto: UsersPhoto

    @OneToMany(type=> UsersFollow, usersFollow => usersFollow.users)
    usersFollow: UsersFollow[]

    @OneToMany(type=> UsersFollow, usersFollow => usersFollow.usersHasFollow)
    usersHasFollow: UsersFollow[]

    @OneToMany(type=>PostLike, postLike=>postLike.users)
    postLike: PostLike[]

    @OneToMany(type=>PostComment, postComment=>postComment.users)
    comment: PostComment[]

    @OneToMany(type=>ChatRoomMember, chatRoomMember=>chatRoomMember.member)
    chatRoomMember: ChatRoomMember[]

    @OneToMany(type=>ChatRoom, chatRoom=>chatRoom.create_by)
    chatRoom: ChatRoom
}