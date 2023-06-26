"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatRoomModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const chat_room_member_module_1 = require("../chat-room-member/chat-room-member.module");
const chat_room_member_repository_1 = require("../chat-room-member/chat-room-member.repository");
const chat_room_member_service_1 = require("../chat-room-member/chat-room-member.service");
const chat_room_controller_1 = require("./chat-room.controller");
const chat_room_repository_1 = require("./chat-room.repository");
const chat_room_service_1 = require("./chat-room.service");
let ChatRoomModule = class ChatRoomModule {
};
ChatRoomModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([chat_room_repository_1.ChatRoomRepository, chat_room_member_repository_1.ChatRoomMemberRepository]), chat_room_member_module_1.ChatRoomMemberModule],
        controllers: [chat_room_controller_1.ChatRoomController],
        providers: [chat_room_service_1.ChatRoomService, chat_room_member_service_1.ChatRoomMemberService],
        exports: [chat_room_service_1.ChatRoomService]
    })
], ChatRoomModule);
exports.ChatRoomModule = ChatRoomModule;
//# sourceMappingURL=chat-room.module.js.map