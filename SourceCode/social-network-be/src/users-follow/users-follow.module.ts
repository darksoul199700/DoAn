import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersFollowController } from './users-follow.controller';
import { UsersFollowRepository } from './users-follow.repository';
import { UsersFollowService } from './users-follow.service';

@Module({
  imports: [TypeOrmModule.forFeature([UsersFollowRepository])],
  controllers: [UsersFollowController],
  providers: [UsersFollowService],
  exports: [UsersFollowService]
})
export class UsersFollowModule {}
