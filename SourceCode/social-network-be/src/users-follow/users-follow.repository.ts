import { Repository, EntityRepository } from "typeorm";
import { UsersFollow } from "./users-follow.entity";


@EntityRepository(UsersFollow)
export class UsersFollowRepository extends Repository<UsersFollow>{}