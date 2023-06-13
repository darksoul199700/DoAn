import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostLikesController } from './post-likes.controller';
import { PostLikeRepository } from './post-likes.repository';
import { PostLikesService } from './post-likes.service';

@Module({
  imports: [TypeOrmModule.forFeature([PostLikeRepository])],
  controllers: [PostLikesController],
  providers: [PostLikesService],
  exports: [PostLikesService]
})
export class PostLikesModule {}
