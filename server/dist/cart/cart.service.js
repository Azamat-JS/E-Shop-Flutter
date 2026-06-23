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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const cart_entity_1 = require("./entities/cart.entity");
const auth_entity_1 = require("../auth/entities/auth.entity");
const product_entity_1 = require("../product/entities/product.entity");
let CartService = class CartService {
    cartRepo;
    userRepo;
    productRepo;
    constructor(cartRepo, userRepo, productRepo) {
        this.cartRepo = cartRepo;
        this.userRepo = userRepo;
        this.productRepo = productRepo;
    }
    async addToCart(createCartDto) {
        const { productId, userId, quantity } = createCartDto;
        const user = await this.userRepo.findOneBy({ id: userId });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        const product = await this.productRepo.findOneBy({ id: productId });
        if (!product)
            throw new common_1.NotFoundException('Product not found');
        const existing = await this.cartRepo.findOne({
            where: { user: { id: userId }, product: { id: productId } },
        });
        if (existing) {
            existing.quantity += quantity;
            return this.cartRepo.save(existing);
        }
        const cartItem = this.cartRepo.create({ user, product, quantity });
        return this.cartRepo.save(cartItem);
    }
    findAll() {
        return `This action returns all cart`;
    }
    findOne(id) {
        return `This action returns a #${id} cart`;
    }
    update(id, _updateCartDto) {
        return `This action updates a #${id} cart`;
    }
    async remove(productId, userId) {
        const user = await this.userRepo.findOneBy({ id: userId });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        const deletedProduct = await this.cartRepo.delete(productId);
        if (deletedProduct.affected === 0) {
            throw new common_1.NotFoundException("Product not found");
        }
        return { message: 'Product deleted successfully!' };
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(cart_entity_1.CartEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(auth_entity_1.AuthEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(product_entity_1.ProductEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], CartService);
//# sourceMappingURL=cart.service.js.map