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
exports.ChatRoomMember = void 0;
const chat_room_entity_1 = require("../chat-room/chat-room.entity");
const message_entity_1 = require("../message/message.entity");
const users_entity_1 = require("../users/users.entity");
const typeorm_1 = require("typeorm");
let ChatRoomMember = class ChatRoomMember extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], ChatRoomMember.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ChatRoomMember.prototype, "nick_name", void 0);
__decorate([
    typeorm_1.ManyToOne(type => users_entity_1.Users, users => users.id),
    typeorm_1.JoinColumn({ name: 'user_id', referencedColumnName: 'id' }),
    __metadata("design:type", users_entity_1.Users)
], ChatRoomMember.prototype, "member", void 0);
__decorate([
    typeorm_1.ManyToOne(type => chat_room_entity_1.ChatRoom, chatRoom => chatRoom.id),
    typeorm_1.JoinColumn({ name: 'chat_room_id', referencedColumnName: 'id' }),
    __metadata("design:type", chat_room_entity_1.ChatRoom)
], ChatRoomMember.prototype, "chatRoom", void 0);
__decorate([
    typeorm_1.OneToMany(type => message_entity_1.Message, message => message.chatRoomMember),
    __metadata("design:type", Array)
], ChatRoomMember.prototype, "message", void 0);
ChatRoomMember = __decorate([
    typeorm_1.Entity({ name: 'chat_room_member', schema: 'db_social_network' })
], ChatRoomMember);
exports.ChatRoomMember = ChatRoomMember;
//# sourceMappingURL=chat-room-member.entity.js.map