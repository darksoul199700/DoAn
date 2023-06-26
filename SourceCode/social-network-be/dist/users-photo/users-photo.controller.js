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
exports.UsersPhotoController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const multer_1 = require("multer");
const user_guard_1 = require("../guard/user.guard");
const users_photo_dto_1 = require("./dto/users-photo.dto");
const users_photo_service_1 = require("./users-photo.service");
let UsersPhotoController = class UsersPhotoController {
    constructor(usersPhotoService) {
        this.usersPhotoService = usersPhotoService;
    }
    uploadUserPhoto(usersPhotoDto, req) {
        return this.usersPhotoService.uploadUsersPhoto(usersPhotoDto, req.user);
    }
    getUserPhotoUrl(req) {
        return this.usersPhotoService.getUserPhotoUrl(req.user);
    }
    uploadUserPhotoToServer(file) {
        return { code: 200, url: file.path };
    }
};
__decorate([
    common_1.UseGuards(user_guard_1.UserGuard),
    swagger_1.ApiBearerAuth(),
    common_1.Post(),
    __param(0, common_1.Body(common_1.ValidationPipe)), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_photo_dto_1.UsersPhotoDto, Object]),
    __metadata("design:returntype", void 0)
], UsersPhotoController.prototype, "uploadUserPhoto", null);
__decorate([
    common_1.UseGuards(user_guard_1.UserGuard),
    swagger_1.ApiBearerAuth(),
    common_1.Get(),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersPhotoController.prototype, "getUserPhotoUrl", null);
__decorate([
    common_1.UseGuards(user_guard_1.UserGuard),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('file', {
        storage: multer_1.diskStorage({
            destination: './photos/user-photo',
            filename: (req, file, cb) => {
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
                const ext = file.mimetype.split("/")[1];
                cb(null, `${randomName}.${ext}`);
            }
        })
    })),
    swagger_1.ApiBearerAuth(),
    common_1.Post('upload-photo-to-server'),
    __param(0, common_1.UploadedFile()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersPhotoController.prototype, "uploadUserPhotoToServer", null);
UsersPhotoController = __decorate([
    swagger_1.ApiTags('users'),
    common_1.Controller('users/users-photo'),
    __metadata("design:paramtypes", [users_photo_service_1.UsersPhotoService])
], UsersPhotoController);
exports.UsersPhotoController = UsersPhotoController;
//# sourceMappingURL=users-photo.controller.js.map