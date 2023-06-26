"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const post_likes_controller_1 = require("./post-likes.controller");
describe('PostLikesController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [post_likes_controller_1.PostLikesController],
        }).compile();
        controller = module.get(post_likes_controller_1.PostLikesController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=post-likes.controller.spec.js.map