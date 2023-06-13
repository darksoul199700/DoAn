import { Test, TestingModule } from '@nestjs/testing';
import { ChatRoomMemberController } from './chat-room-member.controller';

describe('ChatRoomMemberController', () => {
  let controller: ChatRoomMemberController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatRoomMemberController],
    }).compile();

    controller = module.get<ChatRoomMemberController>(ChatRoomMemberController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
