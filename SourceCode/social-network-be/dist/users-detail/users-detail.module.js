"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersDetailModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const users_detail_controller_1 = require("./users-detail.controller");
const users_detail_repository_1 = require("./users-detail.repository");
const users_detail_service_1 = require("./users-detail.service");
const users_repository_1 = require("../users/users.repository");
let UsersDetailModule = class UsersDetailModule {
};
UsersDetailModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([users_detail_repository_1.UsersDetailRepository, users_repository_1.UserRepository])],
        controllers: [users_detail_controller_1.UsersDetailController],
        providers: [users_detail_service_1.UsersDetailService],
        exports: [users_detail_service_1.UsersDetailService]
    })
], UsersDetailModule);
exports.UsersDetailModule = UsersDetailModule;
//# sourceMappingURL=users-detail.module.js.map