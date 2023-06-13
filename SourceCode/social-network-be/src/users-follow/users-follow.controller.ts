import { Body, Controller, Post, UseGuards, ValidationPipe, Request, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserGuard } from 'src/guard/user.guard';
import { UsersFollowDto } from './dto/users-follow.dto';
import { UsersFollowService } from './users-follow.service';

@ApiTags('people')
@Controller('users-follow')
export class UsersFollowController {
    constructor(
        private usersFollowService: UsersFollowService
    ){}

    @UseGuards(UserGuard)
    @ApiBearerAuth()
    @Post()
    UsersFollow(@Body(ValidationPipe) usersFollowDto: UsersFollowDto, @Request() req)
    {
        return this.usersFollowService.followAUsers(usersFollowDto, req.user)
    }

    @UseGuards(UserGuard)
    @ApiBearerAuth()
    @Get('getAllFollow')
    getAllFollow(@Request() req) {
        return this.usersFollowService.getAllFollow(req.user)
    }
}
