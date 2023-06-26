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
exports.MessageService = void 0;
const common_1 = require("@nestjs/common");
const chat_room_member_entity_1 = require("../chat-room-member/chat-room-member.entity");
const chat_room_member_repository_1 = require("../chat-room-member/chat-room-member.repository");
const chat_room_repository_1 = require("../chat-room/chat-room.repository");
const chat_room_service_1 = require("../chat-room/chat-room.service");
const users_entity_1 = require("../users/users.entity");
const util_1 = require("util");
const message_entity_1 = require("./message.entity");
const message_repository_1 = require("./message.repository");
let MessageService = class MessageService {
    constructor(chatRoomService, chatRoomMemberRepository, chatRoomRepository, messageRepository) {
        this.chatRoomService = chatRoomService;
        this.chatRoomMemberRepository = chatRoomMemberRepository;
        this.chatRoomRepository = chatRoomRepository;
        this.messageRepository = messageRepository;
    }
    async saveMessage(messages, create_at, senderId, chatRoomId) {
        const chatRoomMember = await this.chatRoomMemberRepository.createQueryBuilder('chatRoomMember')
            .where('chatRoomMember.member = :senderId', { senderId: senderId })
            .andWhere('chatRoomMember.chatRoom = :chatRoomId', { chatRoomId: chatRoomId })
            .getMany();
        const currentTime = new Date(create_at);
        const create_at_utc = new Date(currentTime.getTime() + currentTime.getTimezoneOffset() * 60000);
        if (util_1.isNullOrUndefined(chatRoomMember[0])) {
            return { code: 201, message: 'this member not exist' };
        }
        else {
            const newMessage = new message_entity_1.Message(create_at_utc, messages, chatRoomMember[0]);
            await newMessage.save();
            return { code: 200, message: 'save message success' };
        }
    }
    async getAllMessage(chatRoomId) {
        const chatRoomMember = await this.chatRoomMemberRepository.createQueryBuilder('chatRoomMember')
            .where('chatRoomMember.chatRoom = :chatRoomId', { chatRoomId: chatRoomId })
            .select([
            'chatRoomMember.id'
        ])
            .getMany();
        const listChatRoomMember = [];
        chatRoomMember.map(x => {
            listChatRoomMember.push(x.id);
        });
        const query2 = await this.messageRepository.createQueryBuilder('message')
            .where('message.chatRoomMember.id IN ' + `(${listChatRoomMember})`)
            .leftJoin('message.chatRoomMember', 'chatRoomMember')
            .leftJoin('chatRoomMember.member', 'member')
            .select([
            'message.messages',
            'message.create_at',
            'chatRoomMember',
            'member.id',
        ])
            .orderBy('message.create_at', 'DESC')
            .getMany();
        return { code: 200, data: query2 };
    }
};
MessageService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [chat_room_service_1.ChatRoomService,
        chat_room_member_repository_1.ChatRoomMemberRepository,
        chat_room_repository_1.ChatRoomRepository,
        message_repository_1.MessageRepository])
], MessageService);
exports.MessageService = MessageService;
//# sourceMappingURL=message.service.js.map