import { Test, TestingModule } from '@nestjs/testing';
import { UsersDetailController } from './users-detail.controller';

describe('UsersDetailController', () => {
  let controller: UsersDetailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersDetailController],
    }).compile();

    controller = module.get<UsersDetailController>(UsersDetailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
