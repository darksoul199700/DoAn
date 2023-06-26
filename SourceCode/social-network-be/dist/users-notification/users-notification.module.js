"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersNotificationModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const users_notification_controller_1 = require("./users-notification.controller");
const users_notification_repository_1 = require("./users-notification.repository");
const users_notification_service_1 = require("./users-notification.service");
let UsersNotificationModule = class UsersNotificationModule {
};
UsersNotificationModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([users_notification_repository_1.UsersNotificationRepository])],
        controllers: [users_notification_controller_1.UsersNotificationController],
        providers: [users_notification_service_1.UsersNotificationService],
        exports: [users_notification_service_1.UsersNotificationService]
    })
], UsersNotificationModule);
exports.UsersNotificationModule = UsersNotificationModule;
//# sourceMappingURL=users-notification.module.js.map