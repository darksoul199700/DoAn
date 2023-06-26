"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const post_comment_controller_1 = require("./post-comment.controller");
describe('PostCommentController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [post_comment_controller_1.PostCommentController],
        }).compile();
        controller = module.get(post_comment_controller_1.PostCommentController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=post-comment.controller.spec.js.map