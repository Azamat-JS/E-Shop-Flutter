import { CreateProductDto, OrderDto, UpdateProductDto } from './dto/create-product.dto';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';
import { RatingEntity } from './entities/ratings.entity';
import { AuthEntity } from "../auth/entities/auth.entity";
import { OrderEntity } from './entities/order.entity';
export declare class ProductService {
    private readonly productRepo;
    private readonly rateRepo;
    private readonly userRepo;
    private readonly orderRepo;
    constructor(productRepo: Repository<ProductEntity>, rateRepo: Repository<RatingEntity>, userRepo: Repository<AuthEntity>, orderRepo: Repository<OrderEntity>);
    create(createProductDto: CreateProductDto): Promise<ProductEntity>;
    findAll(): Promise<ProductEntity[]>;
    findOne(id: string): Promise<ProductEntity>;
    findByCategory(category: string): Promise<ProductEntity[]>;
    searchProduct(productName: string): Promise<ProductEntity[]>;
    rateProduct(productId: string, userId: string, dto: UpdateProductDto): Promise<ProductEntity>;
    orderProduct(userId: string, orderDto: OrderDto): Promise<OrderEntity>;
    update(id: string, updateProductDto: UpdateProductDto): string;
    remove(id: string): Promise<{
        message: string;
    }>;
    dealOfDay(): Promise<ProductEntity>;
}
