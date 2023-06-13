import { type } from "os";
import { Users } from "src/users/users.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'users_detail', schema: 'db_social_network'})
export class UsersDetail extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    surname: string;

    @Column()
    truename: string;

    @Column()
    gender: boolean;

    @Column()
    address: string;

    @Column()
    phonenumber: string;

    @Column()
    username: string;

    @Column()
    usersId: number;

    @OneToOne(type=>Users)
    @JoinColumn({name: 'users_id', referencedColumnName: 'id'})
    users: Users;

}