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
exports.ChatRoom = void 0;
const chat_room_member_entity_1 = require("../chat-room-member/chat-room-member.entity");
const users_entity_1 = require("../users/users.entity");
const typeorm_1 = require("typeorm");
let ChatRoom = class ChatRoom extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], ChatRoom.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], ChatRoom.prototype, "create_at", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ChatRoom.prototype, "room_name", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ChatRoom.prototype, "room_type", void 0);
__decorate([
    typeorm_1.OneToMany(type => chat_room_member_entity_1.ChatRoomMember, chatRoomMember => chatRoomMember.chatRoom),
    __metadata("design:type", Array)
], ChatRoom.prototype, "chatRoomMember", void 0);
__decorate([
    typeorm_1.ManyToOne(type => users_entity_1.Users, create_by => create_by.id),
    typeorm_1.JoinColumn({ name: 'create_by', referencedColumnName: 'id' }),
    __metadata("design:type", users_entity_1.Users)
], ChatRoom.prototype, "create_by", void 0);
ChatRoom = __decorate([
    typeorm_1.Entity({ name: 'chat_room', schema: 'db_social_network' })
], ChatRoom);
exports.ChatRoom = ChatRoom;
//# sourceMappingURL=chat-room.entity.js.map