import { Users } from "src/users/users.entity";
import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'users_photo', schema: 'db_social_network'})
export class UsersPhoto extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    create_at: Date;

    @Column()
    update_at: Date;

    @Column()
    photo_url: string;

    @OneToOne(type=>Users)
    @JoinColumn({name: 'users_id', referencedColumnName: 'id'})
    users: Users
}