"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const chat_room_member_controller_1 = require("./chat-room-member.controller");
describe('ChatRoomMemberController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [chat_room_member_controller_1.ChatRoomMemberController],
        }).compile();
        controller = module.get(chat_room_member_controller_1.ChatRoomMemberController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=chat-room-member.controller.spec.js.map