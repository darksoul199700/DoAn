import { Injectable, Logger } from '@nestjs/common';
import { PostComment } from 'src/post-comment/post-comment.entity';
import { UsersFollow } from 'src/users-follow/users-follow.entity';
import { Users } from 'src/users/users.entity';
import { UserRepository } from 'src/users/users.repository';
import { getRepository } from 'typeorm';
import { SendPostDto } from './dto/send-post.dto';
import { UpdatePostDto } from './dto/update-post';
import { UsersPost } from './users-post.entity';
import { UsersPostRepository } from './users-post.repository';

@Injectable()
export class UsersPostService {
    constructor(
        private userRepository: UserRepository,
        private usersPostRepository: UsersPostRepository,
    ){}

    async createUserPost( sendPostDto: SendPostDto, users: Users)
    {
        const {caption ,photo, create_at} = sendPostDto
        const currentTime = new Date(create_at);
        const post = new UsersPost;

        post.caption = caption
        post.photo = photo
        post.users = users
        post.is_delete = false
        post.create_at = new Date(currentTime.getTime() + currentTime.getTimezoneOffset() * 60000);
        try {
            await post.save();
            await users.save();
            return ({code: 201, data: post})
        } catch (error) {
            Logger.debug(error)
            return {code: 201, message: 'your post error'}
        }

        return {code: 200, message: 'send post success'}
    }
    
    
    async updateUserPost(updatePostDto: UpdatePostDto, postId: number, users: Users) {
        let {caption ,photo, update_at} = updatePostDto
        let currentTime = new Date(update_at);

        let post = await this.usersPostRepository.findOne({where: {id: postId}})

        if(post.usersId == users.id) {
            post.caption = caption
            post.photo = photo
            post.update_at = new Date(currentTime.getTime() + currentTime.getTimezoneOffset() * 60000);
            
            try {
                await post.save();
                return ({code: 200, data: post})
            } catch (error) {
                Logger.debug(error)
                return {code: 201, message: 'System err'}
            }
        } else {
            return {code: 201, message: 'you not owner of this post'}
        }
        

    }

    async deletePost(postId: number) {
        let post = await this.usersPostRepository.findOne({id: postId })
        post.is_delete = true
        try {
            await post.save()
            return ({code: 200, message: 'delete post success'})
        } catch(err) {
            return ({code: 201, message: err.message})
        }
        
    }

    async getAllUserPost(users: Users)
    {
        const query = await getRepository(UsersFollow).find({select: ['usersHasfollowId', 'is_cancel'], where: {users : users, is_cancel : false}})
        
        const select = [users.id]

        query.map((value) => {
            select.push(value.usersHasfollowId)
        })

        // const query2 = await this.userRepository.createQueryBuilder('users')
        // .where('users.id IN ' + `(${select})`)
        // .leftJoin('users.usersDetail', 'detail')
        // .leftJoin('users.usersPhoto', 'photo')
        // .innerJoin('users.post', 'post')
        // .select([
        //     'users.id',
        //     'detail.surname',
        //     'detail.truename',
        //     'detail.username',
        //     'photo.photo_url',
        //     'post.caption',
        //     'post.photo',
        //     'post.create_at',
        // ])
        // .getMany()

        const query2 = await this.usersPostRepository.createQueryBuilder('usersPost')
        .where('usersPost.users.id IN ' + `(${select})`)
        .andWhere('usersPost.is_delete = :delete', {delete: false})
        .leftJoin('usersPost.users', 'users')
        .leftJoin('users.usersDetail', 'detail')
        .leftJoin('users.usersPhoto','photo')
        .leftJoin('usersPost.postLike', 'postLike')
        .select([
            'usersPost.id',
            'users.id',
            'detail.username',
            'photo.photo_url',
            'usersPost.caption',
            'usersPost.photo',
            'usersPost.create_at',
            'postLike.users',
            'postLike',
        ])
        .orderBy('usersPost.create_at','DESC')
        .getMany()

        query2.map((item, index) => {
            let count = 0
            item.postLike.map(itemLike => {
                if(itemLike.is_unlike == false) {
                    count ++;
                }
                if(itemLike.usersLikeId == users.id && itemLike.is_unlike == false){
                    item["is_currentUser_like"] = true
                } else {
                    item["is_currentUser_like"] = false
                } 
            })
            item["countLike"] = count
        })
        
        


        return {code: 200, data: query2}
    }

    async getAllComment(postId: number) {
        // const query = await this.usersPostRepository.createQueryBuilder('usersPost')
        // .where('usersPost.id = :postId', {postId: postId})
        // .innerJoin('usersPost.postComment', 'comment')
        // .innerJoin('comment.users', 'users')
        // .innerJoin('users.usersDetail', 'detail')
        // .select([
        //     'usersPost.caption',
        //     'comment',
        //     'users',
        //     'detail'
        // ]).getMany()

        const query = await getRepository(PostComment).createQueryBuilder('comment')
        .leftJoin('comment.post', 'post')
        .leftJoin('comment.users', 'users')
        .leftJoin('users.usersDetail', 'detail')
        .where('post.id = :id', {id: postId})
        .select([
            'comment',
            'users.id',
            'detail.username'
        ])
        .getMany()
        return query
        // return {code: 200, data: query.getMany()}
    }
    
    async getUsersPostDetail(id: number, users) {
        try {
            let post = await this.usersPostRepository.createQueryBuilder('usersPost')
            .where('usersPost.id = :id', {id: id})
            .andWhere('usersPost.is_delete = :delete', {delete: false})
            .leftJoin('usersPost.users', 'users')
            .leftJoin('users.usersDetail', 'detail')
            .leftJoin('users.usersPhoto','photo')
            .leftJoin('usersPost.postLike', 'postLike')
            .leftJoin('usersPost.postComment', 'postComment')
            .leftJoin('postComment.users', 'postUsers')
            .leftJoin('postUsers.usersDetail', 'postUsersDetail')
            .select([
                'usersPost.id',
                'users.id',
                'detail.username',
                'photo.photo_url',
                'usersPost.caption',
                'usersPost.photo',
                'usersPost.create_at',
                'postLike',
                'postComment',
                'postUsers',
                'postUsersDetail'
            ])
            .getOne()

            let count = 0
            post.postLike.map(itemLike => {
                if(itemLike.is_unlike == false) {
                    count ++;
                }
                if(itemLike.usersLikeId == users.id && itemLike.is_unlike == false){
                    post["is_currentUser_like"] = true
                } else {
                    post["is_currentUser_like"] = false
                } 
            })
            post["countLike"] = count

            



            if(post) {
                return ({code: 200, data: post})
            } else {
                return ({code: 201, message: `post with ${id} not exist`})
            }
        } catch(err) {
            return ({code: 201, message: 'System err'})
            console.log(err.message)
        }
        
    }

    async getUsersPostFollowOwner(usersId: number, users: Users) {
        let query = await this.usersPostRepository.createQueryBuilder('usersPost')
        .where('usersPost.usersId = :id', {id: usersId})
        .andWhere('usersPost.is_delete = :delete', {delete: false})
        .leftJoin('usersPost.users', 'users')
        .leftJoin('users.usersDetail', 'detail')
        .leftJoin('users.usersPhoto','photo')
        .leftJoin('usersPost.postLike', 'postLike')
        .leftJoin('usersPost.postComment', 'postComment')
        .leftJoin('postComment.users', 'postUsers')
        .leftJoin('postUsers.usersDetail', 'postUsersDetail')
        .select([
            'usersPost.id',
            'users.id',
            'detail.username',
            'photo.photo_url',
            'usersPost.caption',
            'usersPost.photo',
            'usersPost.create_at',
            'postLike',
            'postComment',
            'postUsers',
            'postUsersDetail'
        ])
        .orderBy('usersPost.create_at','DESC')
        .getMany()


        query.map((item, index) => {
            let count = 0
            item.postLike.map(itemLike => {
                if(itemLike.is_unlike == false) {
                    count ++;
                }
                if(itemLike.usersLikeId == users.id && itemLike.is_unlike == false){
                    item["is_currentUser_like"] = true
                } else {
                    item["is_currentUser_like"] = false
                } 
            })
            item["countLike"] = count
        })

        return ({code: 200, data: query})
    }
}
