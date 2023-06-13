import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatRoomController } from './chat-room/chat-room.controller';
import { ChatRoomModule } from './chat-room/chat-room.module';
import { MessageModule } from './message/message.module';
import { PostCommentController } from './post-comment/post-comment.controller';
import { PostCommentModule } from './post-comment/post-comment.module';
import { PostLikesController } from './post-likes/post-likes.controller';
import { PostLikesModule } from './post-likes/post-likes.module';
import { UsersDetailModule } from './users-detail/users-detail.module';
import { UsersFollowController } from './users-follow/users-follow.controller';
import { UsersFollowModule } from './users-follow/users-follow.module';
import { UsersNotificationModule } from './users-notification/users-notification.module';
import { UsersPhotoController } from './users-photo/users-photo.controller';
import { UsersPhotoModule } from './users-photo/users-photo.module';
import { UsersPostModule } from './users-post/users-post.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'dung371997',
    database: 'social-network',
    entities: [__dirname + '/**/*.entity.{js,ts}'],
    synchronize: false,
    namingStrategy: new SnakeNamingStrategy(),
  }),
    UsersModule, UsersDetailModule, UsersPostModule, UsersPhotoModule, UsersFollowModule, PostLikesModule, PostCommentModule, MessageModule, ChatRoomModule, UsersNotificationModule],
  controllers: [AppController, UsersPhotoController, UsersFollowController, PostLikesController, PostCommentController, ChatRoomController],
  providers: [AppService ],
})
export class AppModule {}
