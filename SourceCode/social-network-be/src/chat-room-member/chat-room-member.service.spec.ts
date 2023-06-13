import { Test, TestingModule } from '@nestjs/testing';
import { ChatRoomMemberService } from './chat-room-member.service';

describe('ChatRoomMemberService', () => {
  let service: ChatRoomMemberService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatRoomMemberService],
    }).compile();

    service = module.get<ChatRoomMemberService>(ChatRoomMemberService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
