"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersPostModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const users_notification_module_1 = require("../users-notification/users-notification.module");
const users_module_1 = require("../users/users.module");
const users_repository_1 = require("../users/users.repository");
const users_post_controller_1 = require("./users-post.controller");
const users_post_gateway_1 = require("./users-post.gateway");
const users_post_repository_1 = require("./users-post.repository");
const users_post_service_1 = require("./users-post.service");
let UsersPostModule = class UsersPostModule {
};
UsersPostModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([users_post_repository_1.UsersPostRepository, users_repository_1.UserRepository]), users_module_1.UsersModule, users_notification_module_1.UsersNotificationModule],
        controllers: [users_post_controller_1.UsersPostController],
        providers: [users_post_service_1.UsersPostService, users_post_gateway_1.UsersPostGateWay],
        exports: [users_post_service_1.UsersPostService]
    })
], UsersPostModule);
exports.UsersPostModule = UsersPostModule;
//# sourceMappingURL=users-post.module.js.map