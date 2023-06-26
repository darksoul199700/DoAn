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
exports.MessageGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const common_1 = require("@nestjs/common");
const socket_io_1 = require("socket.io");
const message_service_1 = require("./message.service");
const chat_room_service_1 = require("../chat-room/chat-room.service");
const users_entity_1 = require("../users/users.entity");
const create_btw_chat_room_dto_1 = require("../chat-room/dto/create-btw-chat-room.dto");
let MessageGateway = class MessageGateway {
    constructor(messageService, ChatRoomService) {
        this.messageService = messageService;
        this.ChatRoomService = ChatRoomService;
        this.users = 0;
    }
    async handleConnection() {
        this.users++;
        this.server.emit('users', this.users);
        console.log('chatGateWay is connecting');
    }
    async handleDisconnect() {
        this.users--;
        this.server.emit('users', this.users);
    }
    async handleMessage(client, message) {
        common_1.Logger.log(message);
        const result = await this.messageService.saveMessage(message.message, message.create_at, message.sender_id, parseInt(message.room));
        common_1.Logger.log(result);
        client.broadcast.to(message.room).emit('broadcassMessageToClient', message);
    }
    async handleJoinRoom(client, createBwtChatRoomDto) {
        const result = await this.ChatRoomService.createBwtFriendChatRoom(createBwtChatRoomDto);
        if (client.join(`${result.data}`)) {
            const results = { code: 200, message: 'Has success to join this room', room: `${result.data}` };
            const listMessage = await this.messageService.getAllMessage(result.data);
            results['messages'] = listMessage;
            this.server.emit('IsConnect', results);
        }
        else {
            const results = { code: 201, message: 'Has fail to join this room' };
            this.server.emit('IsConnect', results);
        }
    }
    handleLeaveRoom(client, room) {
        const roomName = room.room;
        if (client.leave(roomName)) {
            const result = { code: 200, message: 'Has success to leave this room' };
            this.server.emit('isDisconnect', result);
        }
        else {
            const result = { code: 201, message: 'Has fail to leave this room' };
            this.server.emit('isDisconnect', result);
        }
    }
    async onChat(client, message) {
        client.broadcast.emit('chatNormal', message);
    }
};
__decorate([
    websockets_1.WebSocketServer(),
    __metadata("design:type", socket_io_1.Server)
], MessageGateway.prototype, "server", void 0);
__decorate([
    websockets_1.SubscribeMessage('sendMessageToServer'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], MessageGateway.prototype, "handleMessage", null);
__decorate([
    websockets_1.SubscribeMessage('joinRoom'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, create_btw_chat_room_dto_1.CreateBwtChatRoomDto]),
    __metadata("design:returntype", Promise)
], MessageGateway.prototype, "handleJoinRoom", null);
__decorate([
    websockets_1.SubscribeMessage('leaveRoom'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], MessageGateway.prototype, "handleLeaveRoom", null);
__decorate([
    websockets_1.SubscribeMessage('chatNormal'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MessageGateway.prototype, "onChat", null);
MessageGateway = __decorate([
    websockets_1.WebSocketGateway(4000, { namespace: 'chat' }),
    __metadata("design:paramtypes", [message_service_1.MessageService,
        chat_room_service_1.ChatRoomService])
], MessageGateway);
exports.MessageGateway = MessageGateway;
//# sourceMappingURL=message.gateway.js.map