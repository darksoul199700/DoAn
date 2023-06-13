import { Test, TestingModule } from '@nestjs/testing';
import { UsersPhotoController } from './users-photo.controller';

describe('UsersPhotoController', () => {
  let controller: UsersPhotoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersPhotoController],
    }).compile();

    controller = module.get<UsersPhotoController>(UsersPhotoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
