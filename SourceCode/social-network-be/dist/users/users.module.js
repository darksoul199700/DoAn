"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const typeorm_1 = require("@nestjs/typeorm");
const constants_1 = require("../common/constants/constants");
const jwt_strategy_1 = require("./jwt.strategy");
const users_controller_1 = require("./users.controller");
const users_repository_1 = require("./users.repository");
const users_service_1 = require("./users.service");
let UsersModule = class UsersModule {
};
UsersModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([users_repository_1.UserRepository]),
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secret: constants_1.jwtConstants.secret,
                signOptions: { expiresIn: '30d' },
            })],
        controllers: [users_controller_1.UsersController],
        providers: [users_service_1.UsersService, jwt_strategy_1.JwtStrategy],
        exports: [users_service_1.UsersService, jwt_strategy_1.JwtStrategy]
    })
], UsersModule);
exports.UsersModule = UsersModule;
//# sourceMappingURL=users.module.js.map