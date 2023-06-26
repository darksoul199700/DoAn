"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersPostService = void 0;
const common_1 = require("@nestjs/common");
const post_comment_entity_1 = require("../post-comment/post-comment.entity");
const users_follow_entity_1 = require("../users-follow/users-follow.entity");
const users_entity_1 = require("../users/users.entity");
const users_repository_1 = require("../users/users.repository");
const typeorm_1 = require("typeorm");
const users_post_entity_1 = require("./users-post.entity");
const users_post_repository_1 = require("./users-post.repository");
let UsersPostService = class UsersPostService {
    constructor(userRepository, usersPostRepository) {
        this.userRepository = userRepository;
        this.usersPostRepository = usersPostRepository;
    }
    async createUserPost(sendPostDto, users) {
        const { caption, photo, create_at } = sendPostDto;
        const currentTime = new Date(create_at);
        const post = new users_post_entity_1.UsersPost;
        post.caption = caption;
        post.photo = photo;
        post.users = users;
        post.is_delete = false;
        post.create_at = new Date(currentTime.getTime() + currentTime.getTimezoneOffset() * 60000);
        try {
            await post.save();
            await users.save();
            return ({ code: 201, data: post });
        }
        catch (error) {
            common_1.Logger.debug(error);
            return { code: 201, message: 'your post error' };
        }
        return { code: 200, message: 'send post success' };
    }
    async updateUserPost(updatePostDto, postId, users) {
        let { caption, photo, update_at } = updatePostDto;
        let currentTime = new Date(update_at);
        let post = await this.usersPostRepository.findOne({ where: { id: postId } });
        if (post.usersId == users.id) {
            post.caption = caption;
            post.photo = photo;
            post.update_at = new Date(currentTime.getTime() + currentTime.getTimezoneOffset() * 60000);
            try {
                await post.save();
                return ({ code: 200, data: post });
            }
            catch (error) {
                common_1.Logger.debug(error);
                return { code: 201, message: 'System err' };
            }
        }
        else {
            return { code: 201, message: 'you not owner of this post' };
        }
    }
    async deletePost(postId) {
        let post = await this.usersPostRepository.findOne({ id: postId });
        post.is_delete = true;
        try {
            await post.save();
            return ({ code: 200, message: 'delete post success' });
        }
        catch (err) {
            return ({ code: 201, message: err.message });
        }
    }
    async getAllUserPost(users) {
        const query = await typeorm_1.getRepository(users_follow_entity_1.UsersFollow).find({ select: ['usersHasfollowId', 'is_cancel'], where: { users: users, is_cancel: false } });
        const select = [users.id];
        query.map((value) => {
            select.push(value.usersHasfollowId);
        });
        const query2 = await this.usersPostRepository.createQueryBuilder('usersPost')
            .where('usersPost.users.id IN ' + `(${select})`)
            .andWhere('usersPost.is_delete = :delete', { delete: false })
            .leftJoin('usersPost.users', 'users')
            .leftJoin('users.usersDetail', 'detail')
            .leftJoin('users.usersPhoto', 'photo')
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
            .orderBy('usersPost.create_at', 'DESC')
            .getMany();
        query2.map((item, index) => {
            let count = 0;
            item.postLike.map(itemLike => {
                if (itemLike.is_unlike == false) {
                    count++;
                }
                if (itemLike.usersLikeId == users.id && itemLike.is_unlike == false) {
                    item["is_currentUser_like"] = true;
                }
                else {
                    item["is_currentUser_like"] = false;
                }
            });
            item["countLike"] = count;
        });
        return { code: 200, data: query2 };
    }
    async getAllComment(postId) {
        const query = await typeorm_1.getRepository(post_comment_entity_1.PostComment).createQueryBuilder('comment')
            .leftJoin('comment.post', 'post')
            .leftJoin('comment.users', 'users')
            .leftJoin('users.usersDetail', 'detail')
            .where('post.id = :id', { id: postId })
            .select([
            'comment',
            'users.id',
            'detail.username'
        ])
            .getMany();
        return query;
    }
    async getUsersPostDetail(id, users) {
        try {
            let post = await this.usersPostRepository.createQueryBuilder('usersPost')
                .where('usersPost.id = :id', { id: id })
                .andWhere('usersPost.is_delete = :delete', { delete: false })
                .leftJoin('usersPost.users', 'users')
                .leftJoin('users.usersDetail', 'detail')
                .leftJoin('users.usersPhoto', 'photo')
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
                .getOne();
            let count = 0;
            post.postLike.map(itemLike => {
                if (itemLike.is_unlike == false) {
                    count++;
                }
                if (itemLike.usersLikeId == users.id && itemLike.is_unlike == false) {
                    post["is_currentUser_like"] = true;
                }
                else {
                    post["is_currentUser_like"] = false;
                }
            });
            post["countLike"] = count;
            if (post) {
                return ({ code: 200, data: post });
            }
            else {
                return ({ code: 201, message: `post with ${id} not exist` });
            }
        }
        catch (err) {
            return ({ code: 201, message: 'System err' });
            console.log(err.message);
        }
    }
    async getUsersPostFollowOwner(usersId, users) {
        let query = await this.usersPostRepository.createQueryBuilder('usersPost')
            .where('usersPost.usersId = :id', { id: usersId })
            .andWhere('usersPost.is_delete = :delete', { delete: false })
            .leftJoin('usersPost.users', 'users')
            .leftJoin('users.usersDetail', 'detail')
            .leftJoin('users.usersPhoto', 'photo')
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
            .orderBy('usersPost.create_at', 'DESC')
            .getMany();
        query.map((item, index) => {
            let count = 0;
            item.postLike.map(itemLike => {
                if (itemLike.is_unlike == false) {
                    count++;
                }
                if (itemLike.usersLikeId == users.id && itemLike.is_unlike == false) {
                    item["is_currentUser_like"] = true;
                }
                else {
                    item["is_currentUser_like"] = false;
                }
            });
            item["countLike"] = count;
        });
        return ({ code: 200, data: query });
    }
};
UsersPostService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [users_repository_1.UserRepository,
        users_post_repository_1.UsersPostRepository])
], UsersPostService);
exports.UsersPostService = UsersPostService;
//# sourceMappingURL=users-post.service.js.map