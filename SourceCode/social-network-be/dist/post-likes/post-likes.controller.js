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
exports.PostLikesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const user_guard_1 = require("../guard/user.guard");
const post_likes_dto_1 = require("./dto/post-likes.dto");
const post_likes_service_1 = require("./post-likes.service");
let PostLikesController = class PostLikesController {
    constructor(postLikeService) {
        this.postLikeService = postLikeService;
    }
    likePost(postLikeDtop, req) {
        return this.postLikeService.likePost(postLikeDtop, req.user);
    }
};
__decorate([
    common_1.UseGuards(user_guard_1.UserGuard),
    swagger_1.ApiBearerAuth(),
    common_1.Post(''),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [post_likes_dto_1.PostLikeDto, Object]),
    __metadata("design:returntype", void 0)
], PostLikesController.prototype, "likePost", null);
PostLikesController = __decorate([
    swagger_1.ApiTags('post'),
    common_1.Controller('post-likes'),
    __metadata("design:paramtypes", [post_likes_service_1.PostLikesService])
], PostLikesController);
exports.PostLikesController = PostLikesController;
//# sourceMappingURL=post-likes.controller.js.map