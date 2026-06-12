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
exports.RatingEntity = void 0;
const typeorm_1 = require("typeorm");
const product_entity_1 = require("./product.entity");
const auth_entity_1 = require("../../auth/entities/auth.entity");
let RatingEntity = class RatingEntity {
    id;
    value;
    user;
    product;
};
exports.RatingEntity = RatingEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], RatingEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "int",
    }),
    __metadata("design:type", Number)
], RatingEntity.prototype, "value", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => auth_entity_1.AuthEntity, (user) => user.ratings, {
        onDelete: "CASCADE",
    }),
    __metadata("design:type", auth_entity_1.AuthEntity)
], RatingEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.ProductEntity, (product) => product.ratings, {
        onDelete: "CASCADE",
    }),
    __metadata("design:type", product_entity_1.ProductEntity)
], RatingEntity.prototype, "product", void 0);
exports.RatingEntity = RatingEntity = __decorate([
    (0, typeorm_1.Entity)({ name: "ratings" }),
    (0, typeorm_1.Unique)(["user", "product"])
], RatingEntity);
//# sourceMappingURL=ratings.entity.js.map