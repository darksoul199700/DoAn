import { PostComment } from 'src/post-comment/post-comment.entity';
import { Users } from 'src/users/users.entity';
import { UserRepository } from 'src/users/users.repository';
import { SendPostDto } from './dto/send-post.dto';
import { UpdatePostDto } from './dto/update-post';
import { UsersPost } from './users-post.entity';
import { UsersPostRepository } from './users-post.repository';
export declare class UsersPostService {
    private userRepository;
    private usersPostRepository;
    constructor(userRepository: UserRepository, usersPostRepository: UsersPostRepository);
    createUserPost(sendPostDto: SendPostDto, users: Users): Promise<{
        code: number;
        data: UsersPost;
        message?: undefined;
    } | {
        code: number;
        message: string;
        data?: undefined;
    }>;
    updateUserPost(updatePostDto: UpdatePostDto, postId: number, users: Users): Promise<{
        code: number;
        data: UsersPost;
        message?: undefined;
    } | {
        code: number;
        message: string;
        data?: undefined;
    }>;
    deletePost(postId: number): Promise<{
        code: number;
        message: any;
    }>;
    getAllUserPost(users: Users): Promise<{
        code: number;
        data: UsersPost[];
    }>;
    getAllComment(postId: number): Promise<PostComment[]>;
    getUsersPostDetail(id: number, users: any): Promise<{
        code: number;
        data: UsersPost;
        message?: undefined;
    } | {
        code: number;
        message: string;
        data?: undefined;
    }>;
    getUsersPostFollowOwner(usersId: number, users: Users): Promise<{
        code: number;
        data: UsersPost[];
    }>;
}
