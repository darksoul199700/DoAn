import { Injectable } from '@nestjs/common';
import { UsersPost } from 'src/users-post/users-post.entity';
import { Users } from 'src/users/users.entity';
import { getRepository } from 'typeorm';
import { isNullOrUndefined } from 'util';
import { PostLikeDto } from './dto/post-likes.dto';
import { PostLike } from './post-likes.entity';
import { PostLikeRepository } from './post-likes.repository'

@Injectable()
export class PostLikesService {
    constructor(
        private postLikeRepository: PostLikeRepository
    ){}

    async likePost(postLikeDto: PostLikeDto, users: Users) {

        const {createAt, postId} = postLikeDto
        const postLike = new PostLike
        const findPost = await getRepository(UsersPost).findOne({where: {id: postId}})

        const query = await this.postLikeRepository.findOne({where: {usersPost: findPost, users: users}})
        if(isNullOrUndefined(query)){
            postLike.create_at = createAt
            postLike.users = users
            postLike.usersPost = findPost
            postLike.is_unlike = false

            await postLike.save()

            return {code: 200, message: 'ahihi'}
        } else {
            query.is_unlike = !query.is_unlike
            await query.save()

            return {code: 200, message: 'ahihi'}
        }

        return {code: 201}
    }
}
