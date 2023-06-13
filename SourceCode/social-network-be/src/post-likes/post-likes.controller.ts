import { Controller, UseGuards, Request, Post, Body } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserGuard } from 'src/guard/user.guard';
import { PostLikeDto } from './dto/post-likes.dto';
import { PostLikesService } from './post-likes.service';

@ApiTags('post')
@Controller('post-likes')
export class PostLikesController {
    constructor(
        private postLikeService: PostLikesService
    ){}

    @UseGuards(UserGuard)
    @ApiBearerAuth()
    @Post('')
    likePost(@Body() postLikeDtop: PostLikeDto, @Request() req) {
        return this.postLikeService.likePost(postLikeDtop, req.user)
    }
}
