import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersPhotoService } from './users-photo.service';
import { UsersPhotoRepository } from './users-photo.repository'
import { UsersPhotoController } from './users-photo.controller';
import { UserRepository } from 'src/users/users.repository';

@Module({
  imports:[TypeOrmModule.forFeature([UsersPhotoRepository, UserRepository])],
  controllers: [UsersPhotoController],
  providers: [UsersPhotoService],
  exports: [UsersPhotoService]
})
export class UsersPhotoModule {}
