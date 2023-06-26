"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostCommentRepository = void 0;
const typeorm_1 = require("typeorm");
const post_comment_entity_1 = require("./post-comment.entity");
let PostCommentRepository = class PostCommentRepository extends typeorm_1.Repository {
};
PostCommentRepository = __decorate([
    typeorm_1.EntityRepository(post_comment_entity_1.PostComment)
], PostCommentRepository);
exports.PostCommentRepository = PostCommentRepository;
//# sourceMappingURL=post-comment.repository.js.map