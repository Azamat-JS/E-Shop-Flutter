import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import type { AuthenticatedRequest } from "../utils/types/types";
import { RateProductDto } from './dto/rate-product.dto';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    findAll(): Promise<import("./entities/product.entity").ProductEntity[]>;
    findByCategory(category: string): Promise<import("./entities/product.entity").ProductEntity[]>;
    create(createProductDto: CreateProductDto): Promise<import("./entities/product.entity").ProductEntity>;
    searchProduct(productName: string): Promise<import("./entities/product.entity").ProductEntity[]>;
    findOne(id: string): Promise<import("./entities/product.entity").ProductEntity>;
    rateProduct(productId: string, dto: RateProductDto, req: AuthenticatedRequest): Promise<import("./entities/product.entity").ProductEntity | null>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
