import { Body, Controller, Delete, Get, Param, Post, Put, Query, Request, UploadedFile, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { UserGuard } from 'src/guard/user.guard';
import { SendPostDto } from './dto/send-post.dto';
import { UpdatePostDto } from './dto/update-post';
import { UsersPostService } from './users-post.service';

@ApiTags('post')
@Controller('users-post')
export class UsersPostController {
    constructor(
        private userPostService: UsersPostService
    ){}
    
    @UseGuards(UserGuard)
    @ApiBearerAuth()
    @Post('/send-post')
    sendPost(@Body(ValidationPipe) sendPostDto: SendPostDto, @Request() req)
    {
        return this.userPostService.createUserPost(sendPostDto, req.user)
    }

    @UseGuards(UserGuard)
    @ApiBearerAuth()
    @Put('/update-post')
    updatePost(@Query('postId') postId: number, @Body(ValidationPipe) updatePostDto: UpdatePostDto, @Request() req)
    {
        return this.userPostService.updateUserPost(updatePostDto, postId, req.user)
    }

    @UseGuards(UserGuard)
    @ApiBearerAuth()
    @Get('/all-post')
    getAllPost(@Request() req)
    {
        return this.userPostService.getAllUserPost(req.user)
    }

    @Get('/all-comment/:id')
    getAllPostCommet(@Param('id') id: number) {
        return this.userPostService.getAllComment(id)
    }

    @Get('/post-detail')
    @UseGuards(UserGuard)
    @ApiBearerAuth()
    getUsersPostDetail(
        @Query('id') id: number,
        @Request() req
    ) {
        return this.userPostService.getUsersPostDetail(id, req.user)
    }

    @Get('/user-all-post')
    @UseGuards(UserGuard)
    @ApiBearerAuth()
    getUsersAllPost(
        @Query('usersId') usersId: number,
        @Request() req
    ) {
        return this.userPostService.getUsersPostFollowOwner(usersId, req.user)
    }

    @Delete('/delete')
    @UseGuards(UserGuard)
    @ApiBearerAuth()
    deleteUsersPost(
        @Query('postId') postId: number
    ) {
        return this.userPostService.deletePost(postId)
    }

    @UseGuards(UserGuard)
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './photos/post-photo',
            filename: (req, file, cb) => {

                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
                //Calling the callback passing the random name generated with the original extension name
                const ext = file.mimetype.split("/")[1];
                cb(null, `${randomName}.${ext}`)
            }
        })
    }))
    @ApiBearerAuth()
    @Post('upload-post-photo-to-server')
    uploadUserPhotoToServer(@UploadedFile() file: Express.Multer.File)
    {
        return {code: 200, url: file.path}
    }
}
