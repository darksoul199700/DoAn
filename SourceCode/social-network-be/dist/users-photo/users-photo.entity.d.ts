import { Users } from "src/users/users.entity";
import { BaseEntity } from "typeorm";
export declare class UsersPhoto extends BaseEntity {
    id: number;
    create_at: Date;
    update_at: Date;
    photo_url: string;
    users: Users;
}
