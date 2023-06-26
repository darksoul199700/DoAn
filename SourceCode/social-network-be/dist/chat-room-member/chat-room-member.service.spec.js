"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const chat_room_member_service_1 = require("./chat-room-member.service");
describe('ChatRoomMemberService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [chat_room_member_service_1.ChatRoomMemberService],
        }).compile();
        service = module.get(chat_room_member_service_1.ChatRoomMemberService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=chat-room-member.service.spec.js.map