import { Test, TestingModule } from '@nestjs/testing';
import { UsersPhotoService } from './users-photo.service';

describe('UsersPhotoService', () => {
  let service: UsersPhotoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersPhotoService],
    }).compile();

    service = module.get<UsersPhotoService>(UsersPhotoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
