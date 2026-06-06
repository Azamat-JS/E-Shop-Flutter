import { CreateProductDto, UpdateProductDto } from './dto/create-product.dto';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';
export declare class ProductService {
    private readonly productRepo;
    constructor(productRepo: Repository<ProductEntity>);
    create(createProductDto: CreateProductDto): ProductEntity;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateProductDto: UpdateProductDto): string;
    remove(id: string): string;
}
