"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_naming_strategies_1 = require("typeorm-naming-strategies");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const chat_room_controller_1 = require("./chat-room/chat-room.controller");
const chat_room_module_1 = require("./chat-room/chat-room.module");
const message_module_1 = require("./message/message.module");
const post_comment_controller_1 = require("./post-comment/post-comment.controller");
const post_comment_module_1 = require("./post-comment/post-comment.module");
const post_likes_controller_1 = require("./post-likes/post-likes.controller");
const post_likes_module_1 = require("./post-likes/post-likes.module");
const users_detail_module_1 = require("./users-detail/users-detail.module");
const users_follow_controller_1 = require("./users-follow/users-follow.controller");
const users_follow_module_1 = require("./users-follow/users-follow.module");
const users_notification_module_1 = require("./users-notification/users-notification.module");
const users_photo_controller_1 = require("./users-photo/users-photo.controller");
const users_photo_module_1 = require("./users-photo/users-photo.module");
const users_post_module_1 = require("./users-post/users-post.module");
const users_module_1 = require("./users/users.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'postgres',
                password: 'dung371997',
                database: 'social-network',
                entities: [__dirname + '/**/*.entity.{js,ts}'],
                synchronize: false,
                namingStrategy: new typeorm_naming_strategies_1.SnakeNamingStrategy(),
            }),
            users_module_1.UsersModule, users_detail_module_1.UsersDetailModule, users_post_module_1.UsersPostModule, users_photo_module_1.UsersPhotoModule, users_follow_module_1.UsersFollowModule, post_likes_module_1.PostLikesModule, post_comment_module_1.PostCommentModule, message_module_1.MessageModule, chat_room_module_1.ChatRoomModule, users_notification_module_1.UsersNotificationModule],
        controllers: [app_controller_1.AppController, users_photo_controller_1.UsersPhotoController, users_follow_controller_1.UsersFollowController, post_likes_controller_1.PostLikesController, post_comment_controller_1.PostCommentController, chat_room_controller_1.ChatRoomController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map