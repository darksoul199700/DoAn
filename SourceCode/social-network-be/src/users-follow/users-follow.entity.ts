import { Users } from "src/users/users.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "users_follow", schema: "db_social_network"})
export class UsersFollow extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    usersHasfollowId: number

    @Column()
    create_at: Date

    @Column()
    update_at: Date

    @Column()
    is_cancel: boolean

    @Column()
    usersId: number

    @ManyToOne(type=>Users, users=>users.usersFollow)
    @JoinColumn({name: "users_id", referencedColumnName: "id"})
    users: Users

    @ManyToOne(type=>Users, users=>users.usersFollow)
    @JoinColumn({name: "users_hasfollow_id", referencedColumnName: "id"})
    usersHasFollow: Users
}