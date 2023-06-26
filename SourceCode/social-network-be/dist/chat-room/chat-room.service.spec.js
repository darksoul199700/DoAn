"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const chat_room_service_1 = require("./chat-room.service");
describe('ChatRoomService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [chat_room_service_1.ChatRoomService],
        }).compile();
        service = module.get(chat_room_service_1.ChatRoomService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=chat-room.service.spec.js.map