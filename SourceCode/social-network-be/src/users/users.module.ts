import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jwtConstants } from 'src/common/constants/constants';
import { JwtStrategy } from './jwt.strategy';
import { UsersController } from './users.controller';
import { UserRepository } from './users.repository';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository]),
  PassportModule ,
  JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: {expiresIn: '30d'},

  })],
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy],
  exports: [UsersService, JwtStrategy]
})
export class UsersModule {}
