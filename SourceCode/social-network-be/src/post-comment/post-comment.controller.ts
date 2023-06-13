import { Controller, Post, UseGuards, Request, Body, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserGuard } from 'src/guard/user.guard';
import { CommentDto } from './dto/comment.dto';
import { PostCommentService } from './post-comment.service';

@ApiTags('post')
@Controller('post-comment')
export class PostCommentController {
    constructor(
        private postCommentService: PostCommentService
    ){}
    
    @UseGuards(UserGuard)
    @ApiBearerAuth()
    @Post('')
    commentAPost(@Body(ValidationPipe) commentDto: CommentDto, @Request() req) {
        return this.postCommentService.commentAPost(commentDto, req.user)
    }
}
