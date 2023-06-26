import { CommentDto } from './dto/comment.dto';
import { PostCommentService } from './post-comment.service';
export declare class PostCommentController {
    private postCommentService;
    constructor(postCommentService: PostCommentService);
    commentAPost(commentDto: CommentDto, req: any): Promise<{
        code: number;
        message: string;
    }>;
}
