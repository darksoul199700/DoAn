import { Users } from 'src/users/users.entity';
import { CommentDto } from './dto/comment.dto';
import { PostCommentRepository } from './post-comment.repository';
export declare class PostCommentService {
    private postCommentRepository;
    constructor(postCommentRepository: PostCommentRepository);
    commentAPost(commentDto: CommentDto, users: Users): Promise<{
        code: number;
        message: string;
    }>;
}
