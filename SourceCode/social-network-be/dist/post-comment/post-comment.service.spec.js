"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const post_comment_service_1 = require("./post-comment.service");
describe('PostCommentService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [post_comment_service_1.PostCommentService],
        }).compile();
        service = module.get(post_comment_service_1.PostCommentService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=post-comment.service.spec.js.map