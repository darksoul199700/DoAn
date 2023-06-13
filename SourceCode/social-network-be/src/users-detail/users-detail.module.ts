import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersDetailController } from './users-detail.controller';
import { UsersDetailRepository } from './users-detail.repository';
import { UsersDetailService } from './users-detail.service';
import { UserRepository } from 'src/users/users.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UsersDetailRepository, UserRepository])],
  controllers: [UsersDetailController],
  providers: [UsersDetailService],
  exports: [UsersDetailService]
})
export class UsersDetailModule {}
