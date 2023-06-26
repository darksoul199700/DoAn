import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Status } from 'src/common/enum/users_status.enum';
import { ERROR, SUCCESSFULL } from 'src/common/message/message.enum';
import { UsersFollow } from 'src/users-follow/users-follow.entity';
import { getRepository } from 'typeorm';
import { isNullOrUndefined } from 'util';
import { ChangePasswordDto } from './dto/change-password.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user';
import { Users } from './users.entity';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService
        ){}

    async createUser (createUserDto: CreateUserDto) {
        const {username, password, email} = createUserDto

        const listUsers = await this.userRepository.findOne({select: ['username'], where: [{username: username}, {email: email}]})

        // const listUsers = await this.userRepository.createQueryBuilder()
        // .where("username = :username OR email = :email", {username : username, email : email})
        // .getMany()

        if(!isNullOrUndefined(listUsers))
        {
            return {code: 201, message: ERROR.EXIST_USERNAME, data: listUsers}
        }

        const user = new Users();
        const salt = await bcrypt.genSalt();
        const encrypt = await this.userRepository.hashPassword(password, salt);
        user.username = username;
        user.password = encrypt;
        user.email = email;
        user.status = Status.PENDING_VERIFIED;

        try {
            await user.save();
        }
        catch(error)
        {
            Logger.log(error)
            return "Register fail"
        }

        return {code: 200, message: SUCCESSFULL.REGISTER_SUCCESSFULL, data: listUsers}
    }

    async loginUser (loginUserDto: LoginUserDto) {
        const {username, password} = loginUserDto

        const checkLogin = await this.userRepository.findOne({where: {username}})
        if(checkLogin) {
            const isMatchingPassword = await bcrypt.compare(password, checkLogin.password)
            if(isMatchingPassword === true)
            {
                const payload = {username: checkLogin.username, id: checkLogin.id}
                const accessToken = this.jwtService.sign(payload)
                return {code: 200, accessToken: accessToken ,message: "Login successful"}
            } else {
                return ({code: 201, message: "username or password is not correct"})
            }
        } else {
            return ({code: 201, message: "username or password is not correct"})
        }
    }

    async findOne(username: string) {
        return this.userRepository.findOne({select: ['username', 'password'], where: {username: username}})
    }

    async findAllUser(users: Users)
    {
        const query = await this.userRepository.createQueryBuilder('users')
        .where('users.id != :id', {id : users.id})
        .leftJoin('users.usersDetail', 'detail')
        .leftJoin('users.usersPhoto', 'photo')
        .leftJoin('users.usersHasFollow', 'hasFollow', `hasFollow.usersId = ${users.id} and hasFollow.is_cancel = false`)
        .select([
            'users.id',
            'users.username',
            'detail.surname',
            'detail.truename',
            'detail.username',
            'photo.photo_url',
            'hasFollow.id',
            'hasFollow.usersId',
            'hasFollow.is_cancel'
        ])
        .getMany()

        const checkHasFollow = await getRepository(UsersFollow).find({where: {usersId: users.id}})
        
        query.map(value => {
            checkHasFollow.map(values => {
                if(value.id === values.usersHasfollowId) {
                    value["hasFollow"] = true
                    if(values.is_cancel) {
                        value["isCancel"] = true
                    }
                    else {
                        value["isCancel"] = false
                    }
                }
            
            })
        })

        return {code: 200, data: await query}
    }

    async changePassword(changePasswordDto: ChangePasswordDto, users: Users) {
        const user = await this.userRepository.findOne({where: {id: users.id}});
        if (user) {
            const {newPassword, retypePassword, oldPassword} = changePasswordDto;
            const isMatchingPassword = await bcrypt.compare(oldPassword, user.password);
            const salt = await bcrypt.genSalt();
            const encrypt = await this.userRepository.hashPassword(newPassword, salt);
            if (!isMatchingPassword) {
                return {code: 202, message: "Current Password is incorrect"}
            }
            if (newPassword === retypePassword) {
                user.password = encrypt;
                await user.save();

                return {code: 200, message: "Change password successfully"};
            }
        }

        return {code: 201, message: "Change password failed"};
    }
}
