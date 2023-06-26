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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersFollowService = void 0;
const common_1 = require("@nestjs/common");
const users_entity_1 = require("../users/users.entity");
const typeorm_1 = require("typeorm");
const util_1 = require("util");
const users_follow_entity_1 = require("./users-follow.entity");
const users_follow_repository_1 = require("./users-follow.repository");
let UsersFollowService = class UsersFollowService {
    constructor(usersFollowRepository) {
        this.usersFollowRepository = usersFollowRepository;
    }
    async followAUsers(usersFollowDto, users) {
        const { users_follow_id, create_at } = usersFollowDto;
        const checkUserFollowId = await typeorm_1.getRepository(users_entity_1.Users).find({ where: { id: users_follow_id } });
        const checkIsUsedToFriend = await this.usersFollowRepository.findOne({ where: [{ users: users, usersHasfollowId: users_follow_id }] });
        try {
            if (!util_1.isNullOrUndefined(checkUserFollowId)) {
                if (util_1.isNullOrUndefined(checkIsUsedToFriend)) {
                    const usersFollow = new users_follow_entity_1.UsersFollow;
                    usersFollow.usersId = users.id;
                    usersFollow.create_at = create_at;
                    usersFollow.usersHasfollowId = users_follow_id;
                    usersFollow.save();
                }
                else {
                    checkIsUsedToFriend.is_cancel = !checkIsUsedToFriend.is_cancel;
                    checkIsUsedToFriend.update_at = create_at;
                    checkIsUsedToFriend.save();
                }
            }
            return { code: 200, message: "follow user success" };
        }
        catch (error) {
            return { code: 2001, message: "follow user fail" };
        }
    }
    async getAllFollow(users) {
        const allFriend = await this.usersFollowRepository.createQueryBuilder('follow')
            .where('follow.usersId = :users OR follow.usersHasfollowId = :users2', { users: users.id, users2: users.id })
            .select('follow')
            .getMany();
        console.log(allFriend);
        const listId = [];
        allFriend.map(x => {
            if (x.usersHasfollowId != users.id) {
                listId.push(x.usersHasfollowId);
            }
            if (x.usersId != users.id) {
                listId.push(x.usersId);
            }
        });
        if (allFriend.length > 0) {
            const friendDetail = await typeorm_1.getRepository(users_entity_1.Users).createQueryBuilder('users')
                .where('users.id IN' + `(${listId})`)
                .leftJoin('users.usersDetail', 'detail')
                .leftJoin('users.usersPhoto', 'photo')
                .select([
                'users.id',
                'users.username',
                'detail',
                'photo.photo_url'
            ])
                .getMany();
            return { code: 200, data: friendDetail };
        }
        else {
            return { code: 201, message: 'You dont follow any person' };
        }
    }
};
UsersFollowService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [users_follow_repository_1.UsersFollowRepository])
], UsersFollowService);
exports.UsersFollowService = UsersFollowService;
//# sourceMappingURL=users-follow.service.js.map