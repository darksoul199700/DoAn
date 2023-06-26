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
exports.UsersNotificationService = void 0;
const common_1 = require("@nestjs/common");
const users_notification_entity_1 = require("./users-notification.entity");
const users_notification_repository_1 = require("./users-notification.repository");
let UsersNotificationService = class UsersNotificationService {
    constructor(usersNotificationRepository) {
        this.usersNotificationRepository = usersNotificationRepository;
    }
    async addUsersNotification(no_content, type, postId, usersId) {
        let notification = new users_notification_entity_1.UsersNotification;
        let now = new Date();
        const create_at_utc = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
        notification.no_content = no_content;
        notification.type = type;
        notification.postId = postId;
        notification.usersId = usersId;
        notification.create_at = create_at_utc;
        try {
            await notification.save();
        }
        catch (err) {
            console.log(err.message);
        }
    }
    async getAllUsersNotification(usersId) {
        try {
            let result = await this.usersNotificationRepository.find({ where: { usersId: usersId } });
            let data = await this.usersNotificationRepository.createQueryBuilder('p')
                .where('p.usersId = :usersId', { usersId: usersId })
                .leftJoin('p.post', 'post')
                .leftJoin('post.users', 'postOwner')
                .leftJoin('postOwner.usersDetail', 'ownerDetail')
                .select([
                'p',
                'post.id',
                'postOwner.id',
                'ownerDetail.username'
            ])
                .orderBy('p.create_at', 'DESC')
                .getMany();
            let count = await this.usersNotificationRepository.createQueryBuilder('p')
                .where('p.usersId = :usersId', { usersId: usersId })
                .andWhere('p.is_read = :is_read', { is_read: false })
                .leftJoin('p.users', 'users')
                .leftJoin('users.usersDetail', 'detail')
                .select([
                'p',
                'users.id',
                'detail.username'
            ])
                .getCount();
            return ({ code: 200, data: data, count: count });
        }
        catch (err) {
            console.log(err.message);
            return ({ code: 201, message: 'system has error' });
        }
    }
    async readNotification(id) {
        let notification = await this.usersNotificationRepository.findOne({ id: id });
        try {
            notification.is_read = true;
            await notification.save();
            return ({ code: 200 });
        }
        catch (err) {
            console.log(err.message);
            return ({ code: 200 });
        }
    }
};
UsersNotificationService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [users_notification_repository_1.UsersNotificationRepository])
], UsersNotificationService);
exports.UsersNotificationService = UsersNotificationService;
//# sourceMappingURL=users-notification.service.js.map