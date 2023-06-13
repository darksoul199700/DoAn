import { Body, Controller, Get, Post, Put, Request, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserGuard } from 'src/guard/user.guard';
import { ChangePasswordDto } from './dto/change-password.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(
        private userService: UsersService
    ){}

    @Post('/signup') // localhost:8888/users/signup
    async createUser(@Body(ValidationPipe) createUserDto: CreateUserDto) {
        return this.userService.createUser(createUserDto);
    }

    @Post('/signin')
    async loginUser (@Body(ValidationPipe) loginUserDto: LoginUserDto) {
        return this.userService.loginUser(loginUserDto);
    }

    @UseGuards(UserGuard)
    @ApiBearerAuth()
    @Get('/all') // localhost:8888/users/all
    async getAllUser (@Request() req) {
        return this.userService.findAllUser(req.user)
    }

    @UseGuards(UserGuard)
    @ApiBearerAuth()
    @Put('/change-password') // localhost:8888/users/change-password
    async changePassword(@Body(ValidationPipe) changePasswordDto: ChangePasswordDto, @Request() req) {
        return this.userService.changePassword(changePasswordDto, req.user);
    }
}
