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
exports.PostLike = void 0;
const users_post_entity_1 = require("../users-post/users-post.entity");
const users_entity_1 = require("../users/users.entity");
const typeorm_1 = require("typeorm");
let PostLike = class PostLike extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], PostLike.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne(type => users_post_entity_1.UsersPost, usersPost => usersPost.id),
    typeorm_1.JoinColumn({ name: 'post_id', referencedColumnName: 'id' }),
    __metadata("design:type", users_post_entity_1.UsersPost)
], PostLike.prototype, "usersPost", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], PostLike.prototype, "usersLikeId", void 0);
__decorate([
    typeorm_1.ManyToOne(type => users_entity_1.Users, users => users.id),
    typeorm_1.JoinColumn({ name: 'users_like_id', referencedColumnName: 'id' }),
    __metadata("design:type", users_entity_1.Users)
], PostLike.prototype, "users", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], PostLike.prototype, "create_at", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], PostLike.prototype, "is_unlike", void 0);
PostLike = __decorate([
    typeorm_1.Entity({ name: 'post_likes', schema: 'db_social_network' })
], PostLike);
exports.PostLike = PostLike;
//# sourceMappingURL=post-likes.entity.js.map