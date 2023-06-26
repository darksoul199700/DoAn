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
exports.UsersFollow = void 0;
const users_entity_1 = require("../users/users.entity");
const typeorm_1 = require("typeorm");
let UsersFollow = class UsersFollow extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], UsersFollow.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], UsersFollow.prototype, "usersHasfollowId", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], UsersFollow.prototype, "create_at", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], UsersFollow.prototype, "update_at", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], UsersFollow.prototype, "is_cancel", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], UsersFollow.prototype, "usersId", void 0);
__decorate([
    typeorm_1.ManyToOne(type => users_entity_1.Users, users => users.usersFollow),
    typeorm_1.JoinColumn({ name: "users_id", referencedColumnName: "id" }),
    __metadata("design:type", users_entity_1.Users)
], UsersFollow.prototype, "users", void 0);
__decorate([
    typeorm_1.ManyToOne(type => users_entity_1.Users, users => users.usersFollow),
    typeorm_1.JoinColumn({ name: "users_hasfollow_id", referencedColumnName: "id" }),
    __metadata("design:type", users_entity_1.Users)
], UsersFollow.prototype, "usersHasFollow", void 0);
UsersFollow = __decorate([
    typeorm_1.Entity({ name: "users_follow", schema: "db_social_network" })
], UsersFollow);
exports.UsersFollow = UsersFollow;
//# sourceMappingURL=users-follow.entity.js.map