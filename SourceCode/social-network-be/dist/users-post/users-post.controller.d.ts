/// <reference types="multer" />
import { SendPostDto } from './dto/send-post.dto';
import { UpdatePostDto } from './dto/update-post';
import { UsersPostService } from './users-post.service';
export declare class UsersPostController {
    private userPostService;
    constructor(userPostService: UsersPostService);
    sendPost(sendPostDto: SendPostDto, req: any): Promise<{
        code: number;
        data: import("./users-post.entity").UsersPost;
        message?: undefined;
    } | {
        code: number;
        message: string;
        data?: undefined;
    }>;
    updatePost(postId: number, updatePostDto: UpdatePostDto, req: any): Promise<{
        code: number;
        data: import("./users-post.entity").UsersPost;
        message?: undefined;
    } | {
        code: number;
        message: string;
        data?: undefined;
    }>;
    getAllPost(req: any): Promise<{
        code: number;
        data: import("./users-post.entity").UsersPost[];
    }>;
    getAllPostCommet(id: number): Promise<import("../post-comment/post-comment.entity").PostComment[]>;
    getUsersPostDetail(id: number, req: any): Promise<{
        code: number;
        data: import("./users-post.entity").UsersPost;
        message?: undefined;
    } | {
        code: number;
        message: string;
        data?: undefined;
    }>;
    getUsersAllPost(usersId: number, req: any): Promise<{
        code: number;
        data: import("./users-post.entity").UsersPost[];
    }>;
    deleteUsersPost(postId: number): Promise<{
        code: number;
        message: any;
    }>;
    uploadUserPhotoToServer(file: Express.Multer.File): {
        code: number;
        url: string;
    };
}
