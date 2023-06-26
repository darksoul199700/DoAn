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
exports.ChatRoomService = void 0;
const common_1 = require("@nestjs/common");
const chat_room_member_repository_1 = require("../chat-room-member/chat-room-member.repository");
const chat_room_member_service_1 = require("../chat-room-member/chat-room-member.service");
const users_entity_1 = require("../users/users.entity");
const typeorm_1 = require("typeorm");
const chat_room_entity_1 = require("./chat-room.entity");
const chat_room_repository_1 = require("./chat-room.repository");
let ChatRoomService = class ChatRoomService {
    constructor(chatRoomRepository, chatRoomMemberRepository, chatRoomMemberService) {
        this.chatRoomRepository = chatRoomRepository;
        this.chatRoomMemberRepository = chatRoomMemberRepository;
        this.chatRoomMemberService = chatRoomMemberService;
    }
    async createBwtFriendChatRoom(createBtwChatRoomDto) {
        const { create_at, room_name, room_type, friend_id, users_id } = createBtwChatRoomDto;
        const newChatRoom = new chat_room_entity_1.ChatRoom;
        const users = await typeorm_1.getRepository(users_entity_1.Users).findOne({ where: { id: users_id } });
        const friend = await typeorm_1.getRepository(users_entity_1.Users).findOne({ where: { id: friend_id } });
        const isExisChatRoom = await this.chatRoomRepository.createQueryBuilder('chatroom')
            .where(new typeorm_1.Brackets(qp => {
            qp.where('create_by = :users', { users: users_id })
                .orWhere('create_by = :friend', { friend: friend_id });
        }))
            .andWhere('room_type = :room_type', { room_type: room_type })
            .leftJoin('chatroom.chatRoomMember', 'member')
            .andWhere(new typeorm_1.Brackets(qp => {
            qp.where('member.member = :friend', { friend: friend_id })
                .orWhere('member.member = :users', { users: users_id });
        }))
            .select([
            'chatroom.id',
            'chatroom.room_type'
        ])
            .getOne();
        if (isExisChatRoom) {
            return { code: 201, data: isExisChatRoom.id, message: 'Have fun win old friend' };
        }
        else {
            newChatRoom.create_by = users;
            newChatRoom.create_at = create_at;
            newChatRoom.room_name = room_name;
            newChatRoom.room_type = room_type;
            await newChatRoom.save();
            await this.chatRoomMemberService.createChatRoomMember('', users, newChatRoom);
            await this.chatRoomMemberService.createChatRoomMember('', friend, newChatRoom);
            return { code: 200, message: 'create chat room success', data: newChatRoom.id };
        }
    }
};
ChatRoomService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [chat_room_repository_1.ChatRoomRepository,
        chat_room_member_repository_1.ChatRoomMemberRepository,
        chat_room_member_service_1.ChatRoomMemberService])
], ChatRoomService);
exports.ChatRoomService = ChatRoomService;
//# sourceMappingURL=chat-room.service.js.map