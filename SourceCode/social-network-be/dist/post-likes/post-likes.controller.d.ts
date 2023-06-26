import { PostLikeDto } from './dto/post-likes.dto';
import { PostLikesService } from './post-likes.service';
export declare class PostLikesController {
    private postLikeService;
    constructor(postLikeService: PostLikesService);
    likePost(postLikeDtop: PostLikeDto, req: any): Promise<{
        code: number;
        message: string;
    } | {
        code: number;
        message?: undefined;
    }>;
}
