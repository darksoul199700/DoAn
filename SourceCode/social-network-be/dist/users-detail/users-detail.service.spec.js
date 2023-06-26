"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const users_detail_service_1 = require("./users-detail.service");
describe('UsersDetailService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [users_detail_service_1.UsersDetailService],
        }).compile();
        service = module.get(users_detail_service_1.UsersDetailService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=users-detail.service.spec.js.map