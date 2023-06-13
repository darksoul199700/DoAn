import { Injectable } from '@nestjs/common';
import { UsersNotification } from './users-notification.entity';
import { UsersNotificationRepository } from './users-notification.repository';

@Injectable()
export class UsersNotificationService {
    constructor(
        private usersNotificationRepository: UsersNotificationRepository
    ) {

    }

    async addUsersNotification(no_content: string, type: string, postId: number, usersId: number) {
        let notification = new UsersNotification

        let now = new Date()
        const create_at_utc = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
        notification.no_content = no_content
        notification.type = type
        notification.postId = postId
        notification.usersId = usersId
        notification.create_at = create_at_utc

        
        try {
            await notification.save()
        } catch(err) {
            console.log(err.message)
        }
    }
    async getAllUsersNotification(usersId: number) {

        try {
            let result = await this.usersNotificationRepository.find({where: {usersId: usersId}})
            let data = await this.usersNotificationRepository.createQueryBuilder('p')
            .where('p.usersId = :usersId', {usersId: usersId})
            .leftJoin('p.post', 'post')
            .leftJoin('post.users', 'postOwner')
            .leftJoin('postOwner.usersDetail', 'ownerDetail')
            .select([
                'p',
                'post.id',
                'postOwner.id',
                'ownerDetail.username'
            ])
            .orderBy('p.create_at','DESC')
            .getMany()
            let count = await this.usersNotificationRepository.createQueryBuilder('p')
            .where('p.usersId = :usersId', {usersId: usersId})
            .andWhere('p.is_read = :is_read', {is_read: false})
            .leftJoin('p.users', 'users')
            .leftJoin('users.usersDetail', 'detail')
            .select([
                'p',
                'users.id',
                'detail.username'
            ])
            .getCount()
            return ({code: 200, data: data, count: count})
        } catch(err) {
            console.log(err.message)
            return ({code: 201, message: 'system has error'})
        }
    }

    async readNotification(id: number) {
        let notification = await this.usersNotificationRepository.findOne({id: id})

        try {
            notification.is_read = true

            await notification.save()
            return({code: 200})
        } catch(err) {
            console.log(err.message)
            return({code: 200})
        }
    }
}
