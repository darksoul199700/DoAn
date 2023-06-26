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
exports.UsersPostController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const multer_1 = require("multer");
const user_guard_1 = require("../guard/user.guard");
const send_post_dto_1 = require("./dto/send-post.dto");
const update_post_1 = require("./dto/update-post");
const users_post_service_1 = require("./users-post.service");
let UsersPostController = class UsersPostController {
    constructor(userPostService) {
        this.userPostService = userPostService;
    }
    sendPost(sendPostDto, req) {
        return this.userPostService.createUserPost(sendPostDto, req.user);
    }
    updatePost(postId, updatePostDto, req) {
        return this.userPostService.updateUserPost(updatePostDto, postId, req.user);
    }
    getAllPost(req) {
        return this.userPostService.getAllUserPost(req.user);
    }
    getAllPostCommet(id) {
        return this.userPostService.getAllComment(id);
    }
    getUsersPostDetail(id, req) {
        return this.userPostService.getUsersPostDetail(id, req.user);
    }
    getUsersAllPost(usersId, req) {
        return this.userPostService.getUsersPostFollowOwner(usersId, req.user);
    }
    deleteUsersPost(postId) {
        return this.userPostService.deletePost(postId);
    }
    uploadUserPhotoToServer(file) {
        return { code: 200, url: file.path };
    }
};
__decorate([
    common_1.UseGuards(user_guard_1.UserGuard),
    swagger_1.ApiBearerAuth(),
    common_1.Post('/send-post'),
    __param(0, common_1.Body(common_1.ValidationPipe)), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [send_post_dto_1.SendPostDto, Object]),
    __metadata("design:returntype", void 0)
], UsersPostController.prototype, "sendPost", null);
__decorate([
    common_1.UseGuards(user_guard_1.UserGuard),
    swagger_1.ApiBearerAuth(),
    common_1.Put('/update-post'),
    __param(0, common_1.Query('postId')), __param(1, common_1.Body(common_1.ValidationPipe)), __param(2, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_post_1.UpdatePostDto, Object]),
    __metadata("design:returntype", void 0)
], UsersPostController.prototype, "updatePost", null);
__decorate([
    common_1.UseGuards(user_guard_1.UserGuard),
    swagger_1.ApiBearerAuth(),
    common_1.Get('/all-post'),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersPostController.prototype, "getAllPost", null);
__decorate([
    common_1.Get('/all-comment/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UsersPostController.prototype, "getAllPostCommet", null);
__decorate([
    common_1.Get('/post-detail'),
    common_1.UseGuards(user_guard_1.UserGuard),
    swagger_1.ApiBearerAuth(),
    __param(0, common_1.Query('id')),
    __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], UsersPostController.prototype, "getUsersPostDetail", null);
__decorate([
    common_1.Get('/user-all-post'),
    common_1.UseGuards(user_guard_1.UserGuard),
    swagger_1.ApiBearerAuth(),
    __param(0, common_1.Query('usersId')),
    __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], UsersPostController.prototype, "getUsersAllPost", null);
__decorate([
    common_1.Delete('/delete'),
    common_1.UseGuards(user_guard_1.UserGuard),
    swagger_1.ApiBearerAuth(),
    __param(0, common_1.Query('postId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UsersPostController.prototype, "deleteUsersPost", null);
__decorate([
    common_1.UseGuards(user_guard_1.UserGuard),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('file', {
        storage: multer_1.diskStorage({
            destination: './photos/post-photo',
            filename: (req, file, cb) => {
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
                const ext = file.mimetype.split("/")[1];
                cb(null, `${randomName}.${ext}`);
            }
        })
    })),
    swagger_1.ApiBearerAuth(),
    common_1.Post('upload-post-photo-to-server'),
    __param(0, common_1.UploadedFile()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersPostController.prototype, "uploadUserPhotoToServer", null);
UsersPostController = __decorate([
    swagger_1.ApiTags('post'),
    common_1.Controller('users-post'),
    __metadata("design:paramtypes", [users_post_service_1.UsersPostService])
], UsersPostController);
exports.UsersPostController = UsersPostController;
//# sourceMappingURL=users-post.controller.js.map