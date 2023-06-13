import { type } from "os"
import { UsersPost } from "src/users-post/users-post.entity"
import { Users } from "src/users/users.entity"
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity({name: 'post_likes', schema:'db_social_network'})
export class PostLike extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(type=>UsersPost, usersPost => usersPost.id)
    @JoinColumn({name: 'post_id', referencedColumnName: 'id'})
    usersPost: UsersPost

    @Column()
    usersLikeId: number

    @ManyToOne(type=>Users, users=>users.id)
    @JoinColumn({name:'users_like_id', referencedColumnName: 'id'})
    users: Users

    @Column()
    create_at: Date

    @Column()
    is_unlike: boolean
}