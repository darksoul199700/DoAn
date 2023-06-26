"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersPhotoRepository = void 0;
const typeorm_1 = require("typeorm");
const users_photo_entity_1 = require("./users-photo.entity");
let UsersPhotoRepository = class UsersPhotoRepository extends typeorm_1.Repository {
};
UsersPhotoRepository = __decorate([
    typeorm_1.EntityRepository(users_photo_entity_1.UsersPhoto)
], UsersPhotoRepository);
exports.UsersPhotoRepository = UsersPhotoRepository;
//# sourceMappingURL=users-photo.repository.js.map