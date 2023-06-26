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
exports.PostLikesService = void 0;
const common_1 = require("@nestjs/common");
const users_post_entity_1 = require("../users-post/users-post.entity");
const users_entity_1 = require("../users/users.entity");
const typeorm_1 = require("typeorm");
const util_1 = require("util");
const post_likes_entity_1 = require("./post-likes.entity");
const post_likes_repository_1 = require("./post-likes.repository");
let PostLikesService = class PostLikesService {
    constructor(postLikeRepository) {
        this.postLikeRepository = postLikeRepository;
    }
    async likePost(postLikeDto, users) {
        const { createAt, postId } = postLikeDto;
        const postLike = new post_likes_entity_1.PostLike;
        const findPost = await typeorm_1.getRepository(users_post_entity_1.UsersPost).findOne({ where: { id: postId } });
        const query = await this.postLikeRepository.findOne({ where: { usersPost: findPost, users: users } });
        if (util_1.isNullOrUndefined(query)) {
            postLike.create_at = createAt;
            postLike.users = users;
            postLike.usersPost = findPost;
            postLike.is_unlike = false;
            await postLike.save();
            return { code: 200, message: 'ahihi' };
        }
        else {
            query.is_unlike = !query.is_unlike;
            await query.save();
            return { code: 200, message: 'ahihi' };
        }
        return { code: 201 };
    }
};
PostLikesService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [post_likes_repository_1.PostLikeRepository])
], PostLikesService);
exports.PostLikesService = PostLikesService;
//# sourceMappingURL=post-likes.service.js.map