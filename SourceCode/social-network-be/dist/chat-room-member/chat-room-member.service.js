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
exports.ChatRoomMemberService = void 0;
const common_1 = require("@nestjs/common");
const chat_room_entity_1 = require("../chat-room/chat-room.entity");
const chat_room_service_1 = require("../chat-room/chat-room.service");
const users_entity_1 = require("../users/users.entity");
const chat_room_member_entity_1 = require("./chat-room-member.entity");
const chat_room_member_repository_1 = require("./chat-room-member.repository");
let ChatRoomMemberService = class ChatRoomMemberService {
    constructor(chatRoomMemberRepository) {
        this.chatRoomMemberRepository = chatRoomMemberRepository;
    }
    async createChatRoomMember(nickname, users, chatRoom) {
        const newChatRoomMember = new chat_room_member_entity_1.ChatRoomMember;
        newChatRoomMember.nick_name = nickname;
        newChatRoomMember.member = users;
        newChatRoomMember.chatRoom = chatRoom;
        await newChatRoomMember.save();
    }
};
ChatRoomMemberService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [chat_room_member_repository_1.ChatRoomMemberRepository])
], ChatRoomMemberService);
exports.ChatRoomMemberService = ChatRoomMemberService;
//# sourceMappingURL=chat-room-member.service.js.map