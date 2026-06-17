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
exports.CartEntity = void 0;
const auth_entity_1 = require("../../auth/entities/auth.entity");
const product_entity_1 = require("../../product/entities/product.entity");
const typeorm_1 = require("typeorm");
let CartEntity = class CartEntity {
    id;
    user;
    product;
    quantity;
};
exports.CartEntity = CartEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], CartEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => auth_entity_1.AuthEntity, {
        onDelete: "CASCADE",
    }),
    __metadata("design:type", auth_entity_1.AuthEntity)
], CartEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.ProductEntity, {
        onDelete: "CASCADE",
    }),
    __metadata("design:type", product_entity_1.ProductEntity)
], CartEntity.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "int",
        default: 1,
    }),
    __metadata("design:type", Number)
], CartEntity.prototype, "quantity", void 0);
exports.CartEntity = CartEntity = __decorate([
    (0, typeorm_1.Entity)({ name: "cart" }),
    (0, typeorm_1.Unique)(["user", "product"])
], CartEntity);
//# sourceMappingURL=cart.entity.js.map