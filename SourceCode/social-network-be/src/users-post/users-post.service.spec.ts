import { Test, TestingModule } from '@nestjs/testing';
import { UsersPostService } from './users-post.service';

describe('UsersPostService', () => {
  let service: UsersPostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersPostService],
    }).compile();

    service = module.get<UsersPostService>(UsersPostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
