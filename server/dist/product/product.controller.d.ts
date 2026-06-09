import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductQuery } from "../utils/queries/ProductQuery";
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    create(createProductDto: CreateProductDto): Promise<import("./entities/product.entity").ProductEntity>;
    findAll(): Promise<import("./entities/product.entity").ProductEntity[]>;
    findByCategory(query: ProductQuery): Promise<import("./entities/product.entity").ProductEntity[]>;
    update(id: string, updateProductDto: CreateProductDto): string;
    remove(id: string): Promise<{
        message: string;
    }>;
}
