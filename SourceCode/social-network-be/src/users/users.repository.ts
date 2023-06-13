import * as bcrypt from 'bcryptjs';
import { EntityRepository, Repository } from "typeorm";
import { Users } from "./users.entity";

@EntityRepository(Users)
export class UserRepository extends Repository<Users>{
    async hashPassword(password: string, salt: string)
    {
        return bcrypt.hash(password, salt)
    }
}