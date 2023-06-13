import { Injectable } from '@nestjs/common';
import { Users } from 'src/users/users.entity';
import { getRepository } from 'typeorm';
import { isNullOrUndefined } from 'util';
import { UsersFollowDto } from './dto/users-follow.dto';
import { UsersFollow } from './users-follow.entity';
import { UsersFollowRepository } from './users-follow.repository';

@Injectable()
export class UsersFollowService {

    constructor(
        private usersFollowRepository: UsersFollowRepository
    ){}

    async followAUsers(usersFollowDto: UsersFollowDto, users: Users)
    {
        const { users_follow_id ,create_at } = usersFollowDto
        const checkUserFollowId = await getRepository(Users).find({where: {id: users_follow_id}})
        const checkIsUsedToFriend: UsersFollow = await this.usersFollowRepository.findOne({where: [{users: users, usersHasfollowId: users_follow_id}]})
        try {
            if(!isNullOrUndefined(checkUserFollowId)){
                if(isNullOrUndefined(checkIsUsedToFriend)){
                    const usersFollow = new UsersFollow
                    
                    usersFollow.usersId = users.id
                    usersFollow.create_at = create_at
                    usersFollow.usersHasfollowId = users_follow_id
                    usersFollow.save()
                } else {
                    checkIsUsedToFriend.is_cancel = !checkIsUsedToFriend.is_cancel
                    checkIsUsedToFriend.update_at = create_at
                    checkIsUsedToFriend.save()
                }
            }
            return {code: 200, message: "follow user success"}
        } catch (error) {
            return {code: 2001, message: "follow user fail"}
        }
    }

    async getAllFollow(users: Users) {
        const allFriend = await this.usersFollowRepository.createQueryBuilder('follow')
        .where('follow.usersId = :users OR follow.usersHasfollowId = :users2', {users: users.id, users2: users.id})
        .select(
            'follow'
        )
        .getMany();
        console.log(allFriend);
        const listId = []
        allFriend.map(x => {
            if (x.usersHasfollowId != users.id) {
                listId.push(x.usersHasfollowId)
            }
            if (x.usersId != users.id) {
                listId.push(x.usersId)
            }
        })
        if(allFriend.length > 0) {
            const friendDetail = await getRepository(Users).createQueryBuilder('users')
            .where('users.id IN' + `(${listId})`)
            .leftJoin('users.usersDetail', 'detail')
            .leftJoin('users.usersPhoto', 'photo')
            .select([
                'users.id',
                'users.username',
                'detail',
                'photo.photo_url'
            ])
            .getMany()

            return {code: 200, data: friendDetail}
        } else {
            return {code: 201, message: 'You dont follow any person'}
        }

        
    }
}
