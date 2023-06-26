"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const users_photo_controller_1 = require("./users-photo.controller");
describe('UsersPhotoController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [users_photo_controller_1.UsersPhotoController],
        }).compile();
        controller = module.get(users_photo_controller_1.UsersPhotoController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=users-photo.controller.spec.js.map