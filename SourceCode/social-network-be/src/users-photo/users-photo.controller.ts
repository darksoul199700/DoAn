import { Body, Controller, Get, Post, Request, UploadedFile, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { UserGuard } from 'src/guard/user.guard';
import { UsersPhotoDto } from './dto/users-photo.dto';
import { UsersPhotoService } from './users-photo.service';

@ApiTags('users')
@Controller('users/users-photo')
export class UsersPhotoController {

    constructor(private usersPhotoService: UsersPhotoService){}

    @UseGuards(UserGuard)
    @ApiBearerAuth()
    @Post()
    uploadUserPhoto(@Body(ValidationPipe) usersPhotoDto: UsersPhotoDto, @Request() req)
    {
        return this.usersPhotoService.uploadUsersPhoto(usersPhotoDto, req.user)
    }

    @UseGuards(UserGuard)
    @ApiBearerAuth()
    @Get()
    getUserPhotoUrl(@Request() req)
    {
        return this.usersPhotoService.getUserPhotoUrl(req.user)
    }

    @UseGuards(UserGuard)
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './photos/user-photo',
            filename: (req, file, cb) => {
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
                //Calling the callback passing the random name generated with the original extension name
                const ext = file.mimetype.split("/")[1];
                cb(null, `${randomName}.${ext}`)
            }
        })
    }))
    @ApiBearerAuth()
    @Post('upload-photo-to-server')
    uploadUserPhotoToServer(@UploadedFile() file: Express.Multer.File)
    {
        return {code: 200, url: file.path}
    }
}
