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
exports.PostCommentController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const user_guard_1 = require("../guard/user.guard");
const comment_dto_1 = require("./dto/comment.dto");
const post_comment_service_1 = require("./post-comment.service");
let PostCommentController = class PostCommentController {
    constructor(postCommentService) {
        this.postCommentService = postCommentService;
    }
    commentAPost(commentDto, req) {
        return this.postCommentService.commentAPost(commentDto, req.user);
    }
};
__decorate([
    common_1.UseGuards(user_guard_1.UserGuard),
    swagger_1.ApiBearerAuth(),
    common_1.Post(''),
    __param(0, common_1.Body(common_1.ValidationPipe)), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [comment_dto_1.CommentDto, Object]),
    __metadata("design:returntype", void 0)
], PostCommentController.prototype, "commentAPost", null);
PostCommentController = __decorate([
    swagger_1.ApiTags('post'),
    common_1.Controller('post-comment'),
    __metadata("design:paramtypes", [post_comment_service_1.PostCommentService])
], PostCommentController);
exports.PostCommentController = PostCommentController;
//# sourceMappingURL=post-comment.controller.js.map