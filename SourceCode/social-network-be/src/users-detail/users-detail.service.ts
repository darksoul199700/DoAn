import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/users/users.entity';
import { getRepository } from 'typeorm';
import { CreateUsersDetailDto } from './dto/users_detail.dto';
import { UsersDetail } from './users-detail.entity';
import { UsersDetailRepository } from './users-detail.repository';
import { UserRepository } from 'src/users/users.repository';

@Injectable()
export class UsersDetailService {
    constructor(
        @InjectRepository(UsersDetailRepository)
        private usersDetailRepository: UsersDetailRepository,
        private userRepository: UserRepository
    ){}

    async createUsersDetail(CreateUsersDetailDto: CreateUsersDetailDto, users: Users)
    {
        const {surname, truename, gender, address, phonenumber, username} = CreateUsersDetailDto;
        try {
            const findUserDetail = await this.usersDetailRepository.findUserDetail(users.id);
            if (findUserDetail) {
                findUserDetail.surname = surname;
                findUserDetail.truename = truename;
                findUserDetail.gender = gender;
                findUserDetail.address = address;
                findUserDetail.phonenumber = phonenumber;
                findUserDetail.username = username;
                await findUserDetail.save();
            } else {
                const usersDetail = new UsersDetail;

                usersDetail.surname = surname;
                usersDetail.truename = truename;
                usersDetail.gender = gender;
                usersDetail.address = address;
                usersDetail.phonenumber = phonenumber;
                usersDetail.users = users;
                usersDetail.username = username;
                users.usersDetail = usersDetail;
                await usersDetail.save();
                await users.save();
            }
            return {code: 201, message: "Create users detail successfully"}
        } catch (error) {
            return {code: 200, message: "Create users detail fail"} 
        }
    }

    async getUserDetail(users: Users)
    {
        const user = await this.usersDetailRepository.findOne({where: {users: users}})
        const userInfo = await this.userRepository.findOne({where: {id: users.id}, select: ['id', 'username']});
        if(user) {
            user["users_id"] = users.id
        }
        if(user)
        {
            return { code: 200, data: user }
        }
        return { code: 201, message: 'get user detail fail', userInfo: userInfo }
    }

    async getUserDetailById(usersId: number)
    {
        const user = await getRepository(Users).findOne({where: {id: usersId}, relations: ['usersDetail', 'usersPhoto']})
        if(user)
        {
            return { code: 200, data: user }
        }
        return { code: 201, message: 'get user detail fail' }
    }
}
