import { AuthEntity } from "../../auth/entities/auth.entity";
import { ProductEntity } from "../../product/entities/product.entity";
export declare class CartEntity {
    id: string;
    user: AuthEntity;
    product: ProductEntity;
    quantity: number;
}
