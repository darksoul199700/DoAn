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
exports.UsersPost = void 0;
const post_comment_entity_1 = require("../post-comment/post-comment.entity");
const post_likes_entity_1 = require("../post-likes/post-likes.entity");
const users_entity_1 = require("../users/users.entity");
const typeorm_1 = require("typeorm");
let UsersPost = class UsersPost extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], UsersPost.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], UsersPost.prototype, "caption", void 0);
__decorate([
    typeorm_1.Column({ type: 'json' }),
    __metadata("design:type", Object)
], UsersPost.prototype, "photo", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], UsersPost.prototype, "create_at", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], UsersPost.prototype, "update_at", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], UsersPost.prototype, "is_delete", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], UsersPost.prototype, "usersId", void 0);
__decorate([
    typeorm_1.ManyToOne(type => users_entity_1.Users, users => users.post),
    typeorm_1.JoinColumn({ name: 'users_id', referencedColumnName: 'id' }),
    __metadata("design:type", users_entity_1.Users)
], UsersPost.prototype, "users", void 0);
__decorate([
    typeorm_1.OneToMany(type => post_likes_entity_1.PostLike, postLike => postLike.usersPost),
    __metadata("design:type", Array)
], UsersPost.prototype, "postLike", void 0);
__decorate([
    typeorm_1.OneToMany(type => post_comment_entity_1.PostComment, postComment => postComment.post),
    __metadata("design:type", Array)
], UsersPost.prototype, "postComment", void 0);
UsersPost = __decorate([
    typeorm_1.Entity({ name: 'users_post', schema: 'db_social_network' })
], UsersPost);
exports.UsersPost = UsersPost;
//# sourceMappingURL=users-post.entity.js.map