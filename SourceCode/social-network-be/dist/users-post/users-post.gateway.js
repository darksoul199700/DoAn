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
exports.UsersPostGateWay = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const users_follow_entity_1 = require("../users-follow/users-follow.entity");
const users_notification_service_1 = require("../users-notification/users-notification.service");
const users_entity_1 = require("../users/users.entity");
const typeorm_1 = require("typeorm");
const notification_enum_1 = require("../common/enum/notification.enum");
let UsersPostGateWay = class UsersPostGateWay {
    constructor(usersNotificationService) {
        this.usersNotificationService = usersNotificationService;
    }
    handleConnection() {
        const message = 'connecting';
        this.server.emit('connect', message);
        console.log('notification-getway');
    }
    handleDisconnect() {
        const message = 'disconnect';
        this.server.emit('disconnect', message);
    }
    async sendNotification(client, message) {
        console.log(message);
        let sendNotification = await typeorm_1.getRepository(users_follow_entity_1.UsersFollow).createQueryBuilder('p')
            .where('p.users_hasfollow_id = :id', { id: message.senderId })
            .getMany();
        sendNotification.map(x => {
            this.usersNotificationService.addUsersNotification(message.postContent, notification_enum_1.NOTIFICATION_ENUM.POST_CONTENT, message.postId, x.usersId);
        });
        client.broadcast.emit('sendNotifications', message);
    }
};
__decorate([
    websockets_1.WebSocketServer(),
    __metadata("design:type", socket_io_1.Server)
], UsersPostGateWay.prototype, "server", void 0);
__decorate([
    websockets_1.SubscribeMessage('sendNotification'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], UsersPostGateWay.prototype, "sendNotification", null);
UsersPostGateWay = __decorate([
    websockets_1.WebSocketGateway(4000, { namespace: 'notification' }),
    __metadata("design:paramtypes", [users_notification_service_1.UsersNotificationService])
], UsersPostGateWay);
exports.UsersPostGateWay = UsersPostGateWay;
//# sourceMappingURL=users-post.gateway.js.map