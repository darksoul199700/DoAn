import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostCommentService } from './post-comment.service';
import { PostCommentRepository } from './post-comment.repository'
import { PostCommentController } from './post-comment.controller';
import { PostCommentGateway } from './post-comment.gateway';

@Module({
  imports:[TypeOrmModule.forFeature([PostCommentRepository])],
  controllers: [PostCommentController],
  providers: [PostCommentService, PostCommentGateway],
  exports: [PostCommentService]
})
export class PostCommentModule {}
