"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostLikesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const post_likes_controller_1 = require("./post-likes.controller");
const post_likes_repository_1 = require("./post-likes.repository");
const post_likes_service_1 = require("./post-likes.service");
let PostLikesModule = class PostLikesModule {
};
PostLikesModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([post_likes_repository_1.PostLikeRepository])],
        controllers: [post_likes_controller_1.PostLikesController],
        providers: [post_likes_service_1.PostLikesService],
        exports: [post_likes_service_1.PostLikesService]
    })
], PostLikesModule);
exports.PostLikesModule = PostLikesModule;
//# sourceMappingURL=post-likes.module.js.map