"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const post_likes_service_1 = require("./post-likes.service");
describe('PostLikesService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [post_likes_service_1.PostLikesService],
        }).compile();
        service = module.get(post_likes_service_1.PostLikesService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=post-likes.service.spec.js.map