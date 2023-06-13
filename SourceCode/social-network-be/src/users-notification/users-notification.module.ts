import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersNotificationController } from './users-notification.controller';
import { UsersNotificationRepository } from './users-notification.repository'
import { UsersNotificationService } from './users-notification.service';

@Module({
    imports: [TypeOrmModule.forFeature([UsersNotificationRepository])],
    controllers: [UsersNotificationController],
    providers: [UsersNotificationService],
    exports: [UsersNotificationService]
})
export class UsersNotificationModule {}
