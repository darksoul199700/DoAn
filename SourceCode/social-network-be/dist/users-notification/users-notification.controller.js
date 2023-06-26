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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersNotificationController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const user_guard_1 = require("../guard/user.guard");
const users_notification_service_1 = require("./users-notification.service");
let UsersNotificationController = class UsersNotificationController {
    constructor(usersNotificationService) {
        this.usersNotificationService = usersNotificationService;
    }
    getAllUserNotification(req) {
        return this.usersNotificationService.getAllUsersNotification(req.user.id);
    }
    putReadNotification(id) {
        return this.usersNotificationService.readNotification(id);
    }
};
__decorate([
    common_1.Get(),
    common_1.UseGuards(user_guard_1.UserGuard),
    swagger_1.ApiBearerAuth(),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersNotificationController.prototype, "getAllUserNotification", null);
__decorate([
    common_1.Put('/read-notification'),
    common_1.UseGuards(user_guard_1.UserGuard),
    swagger_1.ApiBearerAuth(),
    __param(0, common_1.Query('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UsersNotificationController.prototype, "putReadNotification", null);
UsersNotificationController = __decorate([
    common_1.Controller('users-notification'),
    __metadata("design:paramtypes", [users_notification_service_1.UsersNotificationService])
], UsersNotificationController);
exports.UsersNotificationController = UsersNotificationController;
//# sourceMappingURL=users-notification.controller.js.map