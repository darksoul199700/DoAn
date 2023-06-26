"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const users_post_controller_1 = require("./users-post.controller");
describe('UsersPostController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [users_post_controller_1.UsersPostController],
        }).compile();
        controller = module.get(users_post_controller_1.UsersPostController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=users-post.controller.spec.js.map