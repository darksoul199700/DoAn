"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersDetail = void 0;
const users_entity_1 = require("../users/users.entity");
const typeorm_1 = require("typeorm");
let UsersDetail = class UsersDetail extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], UsersDetail.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], UsersDetail.prototype, "surname", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], UsersDetail.prototype, "truename", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], UsersDetail.prototype, "gender", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], UsersDetail.prototype, "address", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], UsersDetail.prototype, "phonenumber", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], UsersDetail.prototype, "username", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], UsersDetail.prototype, "usersId", void 0);
__decorate([
    typeorm_1.OneToOne(type => users_entity_1.Users),
    typeorm_1.JoinColumn({ name: 'users_id', referencedColumnName: 'id' }),
    __metadata("design:type", users_entity_1.Users)
], UsersDetail.prototype, "users", void 0);
UsersDetail = __decorate([
    typeorm_1.Entity({ name: 'users_detail', schema: 'db_social_network' })
], UsersDetail);
exports.UsersDetail = UsersDetail;
//# sourceMappingURL=users-detail.entity.js.map