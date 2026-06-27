import { ProductEntity } from "./product.entity";
import { AuthEntity } from "../../auth/entities/auth.entity";
export declare class OrderEntity {
    id: string;
    totalPrice: number;
    user: AuthEntity;
    product: ProductEntity;
    quantity: number;
    address: string;
    status: string;
    orderedAt: Date;
}
