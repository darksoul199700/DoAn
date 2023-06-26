"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const users_follow_controller_1 = require("./users-follow.controller");
describe('UsersFollowController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [users_follow_controller_1.UsersFollowController],
        }).compile();
        controller = module.get(users_follow_controller_1.UsersFollowController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=users-follow.controller.spec.js.map