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
exports.UsersFollowController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const user_guard_1 = require("../guard/user.guard");
const users_follow_dto_1 = require("./dto/users-follow.dto");
const users_follow_service_1 = require("./users-follow.service");
let UsersFollowController = class UsersFollowController {
    constructor(usersFollowService) {
        this.usersFollowService = usersFollowService;
    }
    UsersFollow(usersFollowDto, req) {
        return this.usersFollowService.followAUsers(usersFollowDto, req.user);
    }
    getAllFollow(req) {
        return this.usersFollowService.getAllFollow(req.user);
    }
};
__decorate([
    common_1.UseGuards(user_guard_1.UserGuard),
    swagger_1.ApiBearerAuth(),
    common_1.Post(),
    __param(0, common_1.Body(common_1.ValidationPipe)), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_follow_dto_1.UsersFollowDto, Object]),
    __metadata("design:returntype", void 0)
], UsersFollowController.prototype, "UsersFollow", null);
__decorate([
    common_1.UseGuards(user_guard_1.UserGuard),
    swagger_1.ApiBearerAuth(),
    common_1.Get('getAllFollow'),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersFollowController.prototype, "getAllFollow", null);
UsersFollowController = __decorate([
    swagger_1.ApiTags('people'),
    common_1.Controller('users-follow'),
    __metadata("design:paramtypes", [users_follow_service_1.UsersFollowService])
], UsersFollowController);
exports.UsersFollowController = UsersFollowController;
//# sourceMappingURL=users-follow.controller.js.map