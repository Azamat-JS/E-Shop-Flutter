import { ProductService } from './product.service';
import { CreateProductDto, UpdateProductDto } from './dto/create-product.dto';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    findAll(): Promise<import("./entities/product.entity").ProductEntity[]>;
    findByCategory(category: string): Promise<import("./entities/product.entity").ProductEntity[]>;
    create(createProductDto: CreateProductDto): Promise<import("./entities/product.entity").ProductEntity>;
    searchProduct(productName: string): Promise<import("./entities/product.entity").ProductEntity[]>;
    rateProduct(productId: string, dto: UpdateProductDto): Promise<import("./entities/product.entity").ProductEntity>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
