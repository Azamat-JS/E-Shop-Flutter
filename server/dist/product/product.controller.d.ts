import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    create(createProductDto: CreateProductDto): Promise<import("./entities/product.entity").ProductEntity>;
    findAll(): Promise<import("./entities/product.entity").ProductEntity[]>;
    findOne(id: string): string;
    update(id: string, updateProductDto: CreateProductDto): string;
    remove(id: string): Promise<{
        message: string;
    }>;
}
