import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    create(createProductDto: CreateProductDto): import("./entities/product.entity").ProductEntity;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateProductDto: CreateProductDto): string;
    remove(id: string): string;
}
