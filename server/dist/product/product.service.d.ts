import { CreateProductDto, UpdateProductDto } from './dto/create-product.dto';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';
export declare class ProductService {
    private readonly productRepo;
    constructor(productRepo: Repository<ProductEntity>);
    create(createProductDto: CreateProductDto): Promise<ProductEntity>;
    findAll(): Promise<ProductEntity[]>;
    findByCategory(category: string): Promise<ProductEntity[]>;
    searchProduct(productName: string): Promise<ProductEntity[]>;
    update(id: string, updateProductDto: UpdateProductDto): string;
    remove(id: string): Promise<{
        message: string;
    }>;
}
