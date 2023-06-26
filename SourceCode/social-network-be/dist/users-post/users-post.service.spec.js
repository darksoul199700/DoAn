"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const users_post_service_1 = require("./users-post.service");
describe('UsersPostService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [users_post_service_1.UsersPostService],
        }).compile();
        service = module.get(users_post_service_1.UsersPostService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=users-post.service.spec.js.map