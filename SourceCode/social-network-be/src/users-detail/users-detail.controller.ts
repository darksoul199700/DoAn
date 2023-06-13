import { Body, Controller, Get, Post, Query, Request, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserGuard } from 'src/guard/user.guard';
import { CreateUsersDetailDto } from './dto/users_detail.dto';
import { UsersDetailService } from './users-detail.service';
@ApiTags('users')
@Controller('users-detail')
export class UsersDetailController {
    constructor(
        private usersDetailService: UsersDetailService
    ){}
    
    @UseGuards(UserGuard)
    @ApiBearerAuth()
    @Post()
    createUsersDetail(@Body(ValidationPipe) createUsersDetailDto: CreateUsersDetailDto, @Request() req)
    {
        return this.usersDetailService.createUsersDetail(createUsersDetailDto, req.user)
    }

    @UseGuards(UserGuard)
    @ApiBearerAuth()
    @Get('/get-detail')
    getUserDetail(@Request() req)
    {
        return this.usersDetailService.getUserDetail(req.user)
    }

    @UseGuards(UserGuard)
    @ApiBearerAuth()
    @Get('/get-detail-id')
    getUserDetailById(
        @Query('usersId') usersId: number)
    {
        return this.usersDetailService.getUserDetailById(usersId)
    }
}
