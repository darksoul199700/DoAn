import { Controller, Get, Query, UseGuards, Request, Put } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UserGuard } from 'src/guard/user.guard';
import { UsersNotificationService } from './users-notification.service';

@Controller('users-notification')
export class UsersNotificationController {
    constructor(
        private usersNotificationService: UsersNotificationService
    ){

    }

    @Get()
    @UseGuards(UserGuard)
    @ApiBearerAuth()
    getAllUserNotification(
        @Request() req
    ) {
        return this.usersNotificationService.getAllUsersNotification(req.user.id)
    }

    @Put('/read-notification')
    @UseGuards(UserGuard)
    @ApiBearerAuth()
    putReadNotification(
        @Query('id') id: number
    ) {
        return this.usersNotificationService.readNotification(id)
    }
}
