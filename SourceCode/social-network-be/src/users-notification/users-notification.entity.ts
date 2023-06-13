import { type } from "os";
import { UsersPost } from "src/users-post/users-post.entity";
import { Users } from "src/users/users.entity";
import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'users_notification', schema: 'db_social_network'})
export class UsersNotification extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    no_content: string

    @Column()
    create_at: Date

    @Column()
    type: string

    @Column()
    is_read: boolean

    @Column()
    postId: number

    @Column()
    usersId: number

    @OneToOne(type=>UsersPost)
    @JoinColumn({name: 'post_id', referencedColumnName: 'id'})
    post: UsersPost

    @OneToOne(type=>Users)
    @JoinColumn({name: 'users_id', referencedColumnName: 'id'})
    users: Users


}