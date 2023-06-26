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
exports.Message = void 0;
const chat_room_member_entity_1 = require("../chat-room-member/chat-room-member.entity");
const typeorm_1 = require("typeorm");
let Message = class Message extends typeorm_1.BaseEntity {
    constructor(create_at, message, chatRoomMember) {
        super();
        this.create_at = create_at;
        this.messages = message;
        this.chatRoomMember = chatRoomMember;
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Message.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Message.prototype, "messages", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], Message.prototype, "create_at", void 0);
__decorate([
    typeorm_1.ManyToOne(type => chat_room_member_entity_1.ChatRoomMember, chatRoomMember => chatRoomMember.id),
    typeorm_1.JoinColumn({ name: 'chat_room_member_id', referencedColumnName: 'id' }),
    __metadata("design:type", chat_room_member_entity_1.ChatRoomMember)
], Message.prototype, "chatRoomMember", void 0);
Message = __decorate([
    typeorm_1.Entity({ name: 'message', schema: 'db_social_network' }),
    __metadata("design:paramtypes", [Date, String, chat_room_member_entity_1.ChatRoomMember])
], Message);
exports.Message = Message;
//# sourceMappingURL=message.entity.js.map