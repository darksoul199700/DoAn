import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersNotificationModule } from 'src/users-notification/users-notification.module';
import { UsersModule } from 'src/users/users.module';
import { UserRepository } from 'src/users/users.repository';
import { UsersPostController } from './users-post.controller';
import { UsersPostGateWay } from './users-post.gateway';
import { UsersPostRepository } from './users-post.repository';
import { UsersPostService } from './users-post.service';

@Module({
  imports: [TypeOrmModule.forFeature([UsersPostRepository, UserRepository]), UsersModule, UsersNotificationModule],
  controllers: [UsersPostController],
  providers: [UsersPostService, UsersPostGateWay],
  exports: [UsersPostService]
})
export class UsersPostModule {}
