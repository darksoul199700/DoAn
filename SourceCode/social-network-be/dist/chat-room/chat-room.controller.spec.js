"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const chat_room_controller_1 = require("./chat-room.controller");
describe('ChatRoomController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [chat_room_controller_1.ChatRoomController],
        }).compile();
        controller = module.get(chat_room_controller_1.ChatRoomController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=chat-room.controller.spec.js.map