import { Test, TestingModule } from '@nestjs/testing';
import { UsersFollowController } from './users-follow.controller';

describe('UsersFollowController', () => {
  let controller: UsersFollowController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersFollowController],
    }).compile();

    controller = module.get<UsersFollowController>(UsersFollowController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
