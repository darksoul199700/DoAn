import { Repository } from "typeorm";
import { Users } from "./users.entity";
export declare class UserRepository extends Repository<Users> {
    hashPassword(password: string, salt: string): Promise<any>;
}
