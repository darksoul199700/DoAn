import { Users } from "src/users/users.entity";
import { BaseEntity } from "typeorm";
export declare class UsersFollow extends BaseEntity {
    id: number;
    usersHasfollowId: number;
    create_at: Date;
    update_at: Date;
    is_cancel: boolean;
    usersId: number;
    users: Users;
    usersHasFollow: Users;
}
