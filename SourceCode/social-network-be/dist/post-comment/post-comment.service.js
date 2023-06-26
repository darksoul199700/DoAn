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
exports.PostCommentService = void 0;
const common_1 = require("@nestjs/common");
const users_post_entity_1 = require("../users-post/users-post.entity");
const users_entity_1 = require("../users/users.entity");
const typeorm_1 = require("typeorm");
const post_comment_entity_1 = require("./post-comment.entity");
const post_comment_repository_1 = require("./post-comment.repository");
let PostCommentService = class PostCommentService {
    constructor(postCommentRepository) {
        this.postCommentRepository = postCommentRepository;
    }
    async commentAPost(commentDto, users) {
        const { create_at, comment, postId } = commentDto;
        const postComment = new post_comment_entity_1.PostComment;
        const findPost = await typeorm_1.getRepository(users_post_entity_1.UsersPost).findOne({ where: { id: postId } });
        postComment.create_at = create_at;
        postComment.content_comment = comment;
        postComment.users = users;
        postComment.post = findPost;
        await postComment.save();
        return { code: 200, message: 'comment success' };
    }
};
PostCommentService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [post_comment_repository_1.PostCommentRepository])
], PostCommentService);
exports.PostCommentService = PostCommentService;
//# sourceMappingURL=post-comment.service.js.map