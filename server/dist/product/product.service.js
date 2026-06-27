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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const product_entity_1 = require("./entities/product.entity");
const typeorm_2 = require("typeorm");
const ratings_entity_1 = require("./entities/ratings.entity");
const auth_entity_1 = require("../auth/entities/auth.entity");
let ProductService = class ProductService {
    productRepo;
    rateRepo;
    userRepo;
    constructor(productRepo, rateRepo, userRepo) {
        this.productRepo = productRepo;
        this.rateRepo = rateRepo;
        this.userRepo = userRepo;
    }
    async create(createProductDto) {
        const product = this.productRepo.create(createProductDto);
        return this.productRepo.save(product);
    }
    findAll() {
        return this.productRepo.find();
    }
    async findOne(id) {
        const product = await this.productRepo.findOne({
            where: { id },
            relations: { ratings: { user: true } },
        });
        if (!product) {
            throw new common_1.NotFoundException('Product not found');
        }
        return product;
    }
    async findByCategory(category) {
        if (!category) {
            throw new common_1.BadRequestException('Category is required');
        }
        return await this.productRepo.find({
            where: { category },
        });
    }
    async searchProduct(productName) {
        const products = await this.productRepo
            .createQueryBuilder('product')
            .leftJoinAndSelect('product.ratings', 'rating')
            .leftJoinAndSelect('rating.user', 'user')
            .where('product.name ILIKE :name', { name: `%${productName}%` })
            .getMany();
        return products;
    }
    async rateProduct(productId, userId, dto) {
        const user = await this.userRepo.findOneBy({
            id: userId,
        });
        if (!user) {
            throw new common_1.NotFoundException("User not found");
        }
        const product = await this.productRepo.findOne({
            where: { id: productId },
            relations: {
                ratings: true,
            },
        });
        if (!product) {
            throw new common_1.NotFoundException("Product not found");
        }
        await this.rateRepo.upsert({
            user,
            product,
            rating: dto.rating,
        }, ["user", "product"]);
        const updatedProduct = await this.productRepo.findOne({
            where: { id: productId },
            relations: {
                ratings: {
                    user: true,
                },
            },
        });
        if (!updatedProduct) {
            throw new common_1.NotFoundException("Product not found after updating");
        }
        return updatedProduct;
    }
    update(id, updateProductDto) {
        return `This action updates a #${id} product`;
    }
    async remove(id) {
        const deletedProduct = await this.productRepo.delete(id);
        if (deletedProduct.affected === 0) {
            throw new common_1.NotFoundException('Product not found');
        }
        return { message: "Product deleted successfully!" };
    }
    async dealOfDay() {
        let products = await this.productRepo.find({
            relations: { ratings: true },
        });
        products = products.sort((a, b) => {
            let aSum = 0;
            let bSum = 0;
            for (let i = 0; i < a.ratings.length; i++) {
                aSum += a.ratings[i].rating;
            }
            for (let i = 0; i < b.ratings.length; i++) {
                bSum += b.ratings[i].rating;
            }
            return aSum < bSum ? 1 : -1;
        });
        return products[0];
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.ProductEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(ratings_entity_1.RatingEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(auth_entity_1.AuthEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ProductService);
//# sourceMappingURL=product.service.js.map