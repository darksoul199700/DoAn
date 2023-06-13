import { EntityRepository, Repository } from "typeorm";
import { UsersDetail } from "./users-detail.entity";

@EntityRepository(UsersDetail)
export class UsersDetailRepository extends Repository<UsersDetail>{
    async findUserDetail(userId: number) {
        const userDetail = this.findOne({where: {usersId: userId}});
        return userDetail;
    }
}