"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const bcrypt = require("bcryptjs");
const users_status_enum_1 = require("../common/enum/users_status.enum");
const message_enum_1 = require("../common/message/message.enum");
const users_follow_entity_1 = require("../users-follow/users-follow.entity");
const typeorm_2 = require("typeorm");
const util_1 = require("util");
const users_entity_1 = require("./users.entity");
const users_repository_1 = require("./users.repository");
let UsersService = class UsersService {
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    async createUser(createUserDto) {
        const { username, password, email } = createUserDto;
        const listUsers = await this.userRepository.findOne({ select: ['username'], where: [{ username: username }, { email: email }] });
        if (!util_1.isNullOrUndefined(listUsers)) {
            return { code: 201, message: message_enum_1.ERROR.EXIST_USERNAME, data: listUsers };
        }
        const user = new users_entity_1.Users();
        const salt = await bcrypt.genSalt();
        const encrypt = await this.userRepository.hashPassword(password, salt);
        user.username = username;
        user.password = encrypt;
        user.email = email;
        user.status = users_status_enum_1.Status.PENDING_VERIFIED;
        try {
            await user.save();
        }
        catch (error) {
            common_1.Logger.log(error);
            return "Register fail";
        }
        return { code: 200, message: message_enum_1.SUCCESSFULL.REGISTER_SUCCESSFULL, data: listUsers };
    }
    async loginUser(loginUserDto) {
        const { username, password } = loginUserDto;
        const checkLogin = await this.userRepository.findOne({ where: { username } });
        if (checkLogin) {
            const isMatchingPassword = await bcrypt.compare(password, checkLogin.password);
            if (isMatchingPassword === true) {
                const payload = { username: checkLogin.username, id: checkLogin.id };
                const accessToken = this.jwtService.sign(payload);
                return { code: 200, accessToken: accessToken, message: "Login successful" };
            }
            else {
                return ({ code: 201, message: "username or password is not correct" });
            }
        }
        else {
            return ({ code: 201, message: "username or password is not correct" });
        }
    }
    async findOne(username) {
        return this.userRepository.findOne({ select: ['username', 'password'], where: { username: username } });
    }
    async findAllUser(users) {
        const query = await this.userRepository.createQueryBuilder('users')
            .where('users.id != :id', { id: users.id })
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
            .getMany();
        const checkHasFollow = await typeorm_2.getRepository(users_follow_entity_1.UsersFollow).find({ where: { usersId: users.id } });
        query.map(value => {
            checkHasFollow.map(values => {
                if (value.id === values.usersHasfollowId) {
                    value["hasFollow"] = true;
                    if (values.is_cancel) {
                        value["isCancel"] = true;
                    }
                    else {
                        value["isCancel"] = false;
                    }
                }
            });
        });
        return { code: 200, data: await query };
    }
    async changePassword(changePasswordDto, users) {
        const user = await this.userRepository.findOne({ where: { id: users.id } });
        if (user) {
            const { newPassword, retypePassword, oldPassword } = changePasswordDto;
            const isMatchingPassword = await bcrypt.compare(oldPassword, user.password);
            const salt = await bcrypt.genSalt();
            const encrypt = await this.userRepository.hashPassword(newPassword, salt);
            if (!isMatchingPassword) {
                return { code: 202, message: "Current Password is incorrect" };
            }
            if (newPassword === retypePassword) {
                user.password = encrypt;
                await user.save();
                return { code: 200, message: "Change password successfully" };
            }
        }
        return { code: 201, message: "Change password failed" };
    }
};
UsersService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(users_repository_1.UserRepository)),
    __metadata("design:paramtypes", [users_repository_1.UserRepository,
        jwt_1.JwtService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map