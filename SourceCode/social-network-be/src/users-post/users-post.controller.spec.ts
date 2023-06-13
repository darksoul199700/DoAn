import { Test, TestingModule } from '@nestjs/testing';
import { UsersPostController } from './users-post.controller';

describe('UsersPostController', () => {
  let controller: UsersPostController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersPostController],
    }).compile();

    controller = module.get<UsersPostController>(UsersPostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
