import { CreateProductDto, OrderDto, UpdateProductDto } from './dto/create-product.dto';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';
import { RatingEntity } from './entities/ratings.entity';
import { AuthEntity } from "../auth/entities/auth.entity";
export declare class ProductService {
    private readonly productRepo;
    private readonly rateRepo;
    private readonly userRepo;
    constructor(productRepo: Repository<ProductEntity>, rateRepo: Repository<RatingEntity>, userRepo: Repository<AuthEntity>);
    create(createProductDto: CreateProductDto): Promise<ProductEntity>;
    findAll(): Promise<ProductEntity[]>;
    findOne(id: string): Promise<ProductEntity>;
    findByCategory(category: string): Promise<ProductEntity[]>;
    searchProduct(productName: string): Promise<ProductEntity[]>;
    rateProduct(productId: string, userId: string, dto: UpdateProductDto): Promise<ProductEntity>;
    orderProduct(orderDto: OrderDto): Promise<void>;
    update(id: string, updateProductDto: UpdateProductDto): string;
    remove(id: string): Promise<{
        message: string;
    }>;
    dealOfDay(): Promise<ProductEntity>;
}
