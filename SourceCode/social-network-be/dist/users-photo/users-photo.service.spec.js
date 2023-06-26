"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const users_photo_service_1 = require("./users-photo.service");
describe('UsersPhotoService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [users_photo_service_1.UsersPhotoService],
        }).compile();
        service = module.get(users_photo_service_1.UsersPhotoService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=users-photo.service.spec.js.map