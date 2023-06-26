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
exports.Users = void 0;
const chat_room_member_entity_1 = require("../chat-room-member/chat-room-member.entity");
const chat_room_entity_1 = require("../chat-room/chat-room.entity");
const users_status_enum_1 = require("../common/enum/users_status.enum");
const post_comment_entity_1 = require("../post-comment/post-comment.entity");
const post_likes_entity_1 = require("../post-likes/post-likes.entity");
const users_detail_entity_1 = require("../users-detail/users-detail.entity");
const users_follow_entity_1 = require("../users-follow/users-follow.entity");
const users_photo_entity_1 = require("../users-photo/users-photo.entity");
const users_post_entity_1 = require("../users-post/users-post.entity");
const typeorm_1 = require("typeorm");
let Users = class Users extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Users.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Users.prototype, "username", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Users.prototype, "password", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Users.prototype, "email", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Users.prototype, "status", void 0);
__decorate([
    typeorm_1.OneToOne(type => users_detail_entity_1.UsersDetail),
    typeorm_1.JoinColumn({ name: 'users_detail_id', referencedColumnName: 'id' }),
    __metadata("design:type", users_detail_entity_1.UsersDetail)
], Users.prototype, "usersDetail", void 0);
__decorate([
    typeorm_1.OneToMany(type => users_post_entity_1.UsersPost, usersPost => usersPost.users),
    __metadata("design:type", Array)
], Users.prototype, "post", void 0);
__decorate([
    typeorm_1.OneToOne(type => users_photo_entity_1.UsersPhoto),
    typeorm_1.JoinColumn({ name: 'users_photo_id', referencedColumnName: 'id' }),
    __metadata("design:type", users_photo_entity_1.UsersPhoto)
], Users.prototype, "usersPhoto", void 0);
__decorate([
    typeorm_1.OneToMany(type => users_follow_entity_1.UsersFollow, usersFollow => usersFollow.users),
    __metadata("design:type", Array)
], Users.prototype, "usersFollow", void 0);
__decorate([
    typeorm_1.OneToMany(type => users_follow_entity_1.UsersFollow, usersFollow => usersFollow.usersHasFollow),
    __metadata("design:type", Array)
], Users.prototype, "usersHasFollow", void 0);
__decorate([
    typeorm_1.OneToMany(type => post_likes_entity_1.PostLike, postLike => postLike.users),
    __metadata("design:type", Array)
], Users.prototype, "postLike", void 0);
__decorate([
    typeorm_1.OneToMany(type => post_comment_entity_1.PostComment, postComment => postComment.users),
    __metadata("design:type", Array)
], Users.prototype, "comment", void 0);
__decorate([
    typeorm_1.OneToMany(type => chat_room_member_entity_1.ChatRoomMember, chatRoomMember => chatRoomMember.member),
    __metadata("design:type", Array)
], Users.prototype, "chatRoomMember", void 0);
__decorate([
    typeorm_1.OneToMany(type => chat_room_entity_1.ChatRoom, chatRoom => chatRoom.create_by),
    __metadata("design:type", chat_room_entity_1.ChatRoom)
], Users.prototype, "chatRoom", void 0);
Users = __decorate([
    typeorm_1.Entity({ name: 'users', schema: 'db_social_network' })
], Users);
exports.Users = Users;
//# sourceMappingURL=users.entity.js.map