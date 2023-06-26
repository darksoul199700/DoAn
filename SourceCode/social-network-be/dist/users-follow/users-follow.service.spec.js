"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const users_follow_service_1 = require("./users-follow.service");
describe('UsersFollowService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [users_follow_service_1.UsersFollowService],
        }).compile();
        service = module.get(users_follow_service_1.UsersFollowService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=users-follow.service.spec.js.map