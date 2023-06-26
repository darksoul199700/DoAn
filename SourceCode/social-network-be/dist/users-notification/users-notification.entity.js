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
exports.UsersNotification = void 0;
const users_post_entity_1 = require("../users-post/users-post.entity");
const users_entity_1 = require("../users/users.entity");
const typeorm_1 = require("typeorm");
let UsersNotification = class UsersNotification extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], UsersNotification.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], UsersNotification.prototype, "no_content", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], UsersNotification.prototype, "create_at", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], UsersNotification.prototype, "type", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], UsersNotification.prototype, "is_read", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], UsersNotification.prototype, "postId", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], UsersNotification.prototype, "usersId", void 0);
__decorate([
    typeorm_1.OneToOne(type => users_post_entity_1.UsersPost),
    typeorm_1.JoinColumn({ name: 'post_id', referencedColumnName: 'id' }),
    __metadata("design:type", users_post_entity_1.UsersPost)
], UsersNotification.prototype, "post", void 0);
__decorate([
    typeorm_1.OneToOne(type => users_entity_1.Users),
    typeorm_1.JoinColumn({ name: 'users_id', referencedColumnName: 'id' }),
    __metadata("design:type", users_entity_1.Users)
], UsersNotification.prototype, "users", void 0);
UsersNotification = __decorate([
    typeorm_1.Entity({ name: 'users_notification', schema: 'db_social_network' })
], UsersNotification);
exports.UsersNotification = UsersNotification;
//# sourceMappingURL=users-notification.entity.js.map