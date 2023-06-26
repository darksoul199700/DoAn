import { Users } from 'src/users/users.entity';
import { PostLikeDto } from './dto/post-likes.dto';
import { PostLikeRepository } from './post-likes.repository';
export declare class PostLikesService {
    private postLikeRepository;
    constructor(postLikeRepository: PostLikeRepository);
    likePost(postLikeDto: PostLikeDto, users: Users): Promise<{
        code: number;
        message: string;
    } | {
        code: number;
        message?: undefined;
    }>;
}
