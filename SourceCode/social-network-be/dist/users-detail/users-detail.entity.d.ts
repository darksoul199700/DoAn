import { Users } from "src/users/users.entity";
import { BaseEntity } from "typeorm";
export declare class UsersDetail extends BaseEntity {
    id: number;
    surname: string;
    truename: string;
    gender: boolean;
    address: string;
    phonenumber: string;
    username: string;
    usersId: number;
    users: Users;
}
