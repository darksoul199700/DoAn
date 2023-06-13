import { Test, TestingModule } from '@nestjs/testing';
import { UsersFollowService } from './users-follow.service';

describe('UsersFollowService', () => {
  let service: UsersFollowService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersFollowService],
    }).compile();

    service = module.get<UsersFollowService>(UsersFollowService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
