import { Injectable } from '@nestjs/common';
import { UsersPost } from 'src/users-post/users-post.entity';
import { Users } from 'src/users/users.entity';
import { getRepository } from 'typeorm';
import { CommentDto } from './dto/comment.dto';
import { PostComment } from './post-comment.entity';
import { PostCommentRepository } from './post-comment.repository';

@Injectable()
export class PostCommentService {

    constructor(
        private postCommentRepository: PostCommentRepository
    ){}

    async commentAPost(commentDto: CommentDto, users: Users){
        const {create_at, comment, postId} = commentDto

        const postComment = new PostComment

        const findPost = await getRepository(UsersPost).findOne({where: {id: postId}})
        postComment.create_at = create_at
        postComment.content_comment = comment
        postComment.users = users
        postComment.post = findPost
        
        await postComment.save()

        return {code: 200, message: 'comment success'}
    }
}
