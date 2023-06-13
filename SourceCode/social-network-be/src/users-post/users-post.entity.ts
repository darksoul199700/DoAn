import { type } from "os";
import { PostComment } from "src/post-comment/post-comment.entity";
import { PostLike } from "src/post-likes/post-likes.entity";
import { Users } from "src/users/users.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'users_post', schema: 'db_social_network'})
export class UsersPost extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    caption: string;

    @Column({type: 'json'})
    photo: JSON

    @Column()
    create_at: Date;

    @Column()
    update_at: Date;

    @Column()
    is_delete: boolean;

    @Column()
    usersId: number

    @ManyToOne(type=> Users, users => users.post)
    @JoinColumn({name: 'users_id', referencedColumnName: 'id'})
    users: Users

    @OneToMany(type=> PostLike, postLike=>postLike.usersPost)
    postLike: PostLike[]

    @OneToMany(type=>PostComment, postComment=>postComment.post)
    postComment: PostComment[]
} 