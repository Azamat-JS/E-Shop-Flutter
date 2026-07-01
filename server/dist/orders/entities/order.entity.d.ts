import { ProductEntity } from "../../product/entities/product.entity";
import { AuthEntity } from "../../auth/entities/auth.entity";
export declare class OrderEntity {
    id: string;
    totalPrice: number;
    user: AuthEntity;
    products: ProductEntity[];
    address: string;
    status: string;
    orderedAt: Date;
}
