import { UsersPost } from "src/users-post/users-post.entity";
import { Users } from "src/users/users.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'post_comment', schema: 'db_social_network'})
export class PostComment extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    create_at: Date

    @Column()
    content_comment: string

    @ManyToOne(type=>Users, users=>users.id)
    @JoinColumn({name: 'users_comment_id', referencedColumnName: 'id'})
    users: Users

    @ManyToOne(type=>UsersPost, post=>post.id)
    @JoinColumn({name: 'post_id', referencedColumnName: 'id'})
    post: UsersPost
    
}