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
exports.UsersDetailService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const users_entity_1 = require("../users/users.entity");
const typeorm_2 = require("typeorm");
const users_detail_entity_1 = require("./users-detail.entity");
const users_detail_repository_1 = require("./users-detail.repository");
const users_repository_1 = require("../users/users.repository");
let UsersDetailService = class UsersDetailService {
    constructor(usersDetailRepository, userRepository) {
        this.usersDetailRepository = usersDetailRepository;
        this.userRepository = userRepository;
    }
    async createUsersDetail(CreateUsersDetailDto, users) {
        const { surname, truename, gender, address, phonenumber, username } = CreateUsersDetailDto;
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
            }
            else {
                const usersDetail = new users_detail_entity_1.UsersDetail;
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
            return { code: 201, message: "Create users detail successfully" };
        }
        catch (error) {
            return { code: 200, message: "Create users detail fail" };
        }
    }
    async getUserDetail(users) {
        const user = await this.usersDetailRepository.findOne({ where: { users: users } });
        const userInfo = await this.userRepository.findOne({ where: { id: users.id }, select: ['id', 'username'] });
        if (user) {
            user["users_id"] = users.id;
        }
        if (user) {
            return { code: 200, data: user };
        }
        return { code: 201, message: 'get user detail fail', userInfo: userInfo };
    }
    async getUserDetailById(usersId) {
        const user = await typeorm_2.getRepository(users_entity_1.Users).findOne({ where: { id: usersId }, relations: ['usersDetail', 'usersPhoto'] });
        if (user) {
            return { code: 200, data: user };
        }
        return { code: 201, message: 'get user detail fail' };
    }
};
UsersDetailService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(users_detail_repository_1.UsersDetailRepository)),
    __metadata("design:paramtypes", [users_detail_repository_1.UsersDetailRepository,
        users_repository_1.UserRepository])
], UsersDetailService);
exports.UsersDetailService = UsersDetailService;
//# sourceMappingURL=users-detail.service.js.map