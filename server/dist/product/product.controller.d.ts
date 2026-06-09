import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    findAll(): Promise<import("./entities/product.entity").ProductEntity[]>;
    findByCategory(category: string): Promise<import("./entities/product.entity").ProductEntity[]>;
    create(createProductDto: CreateProductDto): Promise<import("./entities/product.entity").ProductEntity>;
    searchProduct(productName: string): Promise<import("./entities/product.entity").ProductEntity[]>;
    update(id: string, updateProductDto: CreateProductDto): string;
    remove(id: string): Promise<{
        message: string;
    }>;
}
