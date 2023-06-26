import { Repository } from "typeorm";
import { UsersDetail } from "./users-detail.entity";
export declare class UsersDetailRepository extends Repository<UsersDetail> {
    findUserDetail(userId: number): Promise<UsersDetail>;
}
