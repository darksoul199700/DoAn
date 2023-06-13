import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import { Users } from 'src/users/users.entity';
import { isNullOrUndefined } from 'util';
import { UsersPhotoDto } from './dto/users-photo.dto';
import { UsersPhoto } from './users-photo.entity';
import { UsersPhotoRepository } from './users-photo.repository';

@Injectable()
export class UsersPhotoService {
    constructor( 
        private usersPhotoRepository: UsersPhotoRepository
    ){}

    
    async uploadUsersPhoto(usersPhotoDto: UsersPhotoDto, users: Users){

        const { photo_url, create_at, update_at } = usersPhotoDto
        const usersPhoto = new UsersPhoto();

        const checkExistPhoto = await this.usersPhotoRepository.findOne({where: {users: users}})
        if(isNullOrUndefined(checkExistPhoto))
        {
            const createAt = new Date(create_at)
            usersPhoto.photo_url = photo_url
            usersPhoto.create_at = new Date(createAt.getTime() + createAt.getTimezoneOffset() * 60000)
            usersPhoto.users = users
            users.usersPhoto = usersPhoto
            try{
                await usersPhoto.save()
                await users.save()
            } catch(error)
            {
                Logger.debug(error)
            }
            
            return {code: 200, message: 'upload photo successfull'}
        }
        else {
            fs.unlink(checkExistPhoto.photo_url, () => {
                return
            });
            await this.usersPhotoRepository.createQueryBuilder()
            .update(this.usersPhotoRepository)
            .set({
                photo_url: photo_url,
                update_at: update_at
            })
            .where("id = :id", {id: checkExistPhoto.id})
            .execute()

            return {code: 200,message: 'update photo successfull'}
        }

        return {code: 201, message: 'fail upload photo'}
    }

    async getUserPhotoUrl(users: Users)
    {
        const photoUrl = await this.usersPhotoRepository.findOne({where: {users: users}})
        if(photoUrl) {
            return {photoUrl: photoUrl.photo_url}
        }
        else {
            return null
        }

        
    }

}
