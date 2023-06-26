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
exports.UsersPhotoService = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const users_entity_1 = require("../users/users.entity");
const util_1 = require("util");
const users_photo_entity_1 = require("./users-photo.entity");
const users_photo_repository_1 = require("./users-photo.repository");
let UsersPhotoService = class UsersPhotoService {
    constructor(usersPhotoRepository) {
        this.usersPhotoRepository = usersPhotoRepository;
    }
    async uploadUsersPhoto(usersPhotoDto, users) {
        const { photo_url, create_at, update_at } = usersPhotoDto;
        const usersPhoto = new users_photo_entity_1.UsersPhoto();
        const checkExistPhoto = await this.usersPhotoRepository.findOne({ where: { users: users } });
        if (util_1.isNullOrUndefined(checkExistPhoto)) {
            const createAt = new Date(create_at);
            usersPhoto.photo_url = photo_url;
            usersPhoto.create_at = new Date(createAt.getTime() + createAt.getTimezoneOffset() * 60000);
            usersPhoto.users = users;
            users.usersPhoto = usersPhoto;
            try {
                await usersPhoto.save();
                await users.save();
            }
            catch (error) {
                common_1.Logger.debug(error);
            }
            return { code: 200, message: 'upload photo successfull' };
        }
        else {
            fs.unlink(checkExistPhoto.photo_url, () => {
                return;
            });
            await this.usersPhotoRepository.createQueryBuilder()
                .update(this.usersPhotoRepository)
                .set({
                photo_url: photo_url,
                update_at: update_at
            })
                .where("id = :id", { id: checkExistPhoto.id })
                .execute();
            return { code: 200, message: 'update photo successfull' };
        }
        return { code: 201, message: 'fail upload photo' };
    }
    async getUserPhotoUrl(users) {
        const photoUrl = await this.usersPhotoRepository.findOne({ where: { users: users } });
        if (photoUrl) {
            return { photoUrl: photoUrl.photo_url };
        }
        else {
            return null;
        }
    }
};
UsersPhotoService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [users_photo_repository_1.UsersPhotoRepository])
], UsersPhotoService);
exports.UsersPhotoService = UsersPhotoService;
//# sourceMappingURL=users-photo.service.js.map