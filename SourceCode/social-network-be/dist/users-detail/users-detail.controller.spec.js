"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const users_detail_controller_1 = require("./users-detail.controller");
describe('UsersDetailController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [users_detail_controller_1.UsersDetailController],
        }).compile();
        controller = module.get(users_detail_controller_1.UsersDetailController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=users-detail.controller.spec.js.map