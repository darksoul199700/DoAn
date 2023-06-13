import { Test, TestingModule } from '@nestjs/testing';
import { UsersDetailService } from './users-detail.service';

describe('UsersDetailService', () => {
  let service: UsersDetailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersDetailService],
    }).compile();

    service = module.get<UsersDetailService>(UsersDetailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
