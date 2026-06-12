import { ProductEntity } from "./product.entity";
import { AuthEntity } from "../../auth/entities/auth.entity";
export declare class RatingEntity {
    id: string;
    value: number;
    user: AuthEntity;
    product: ProductEntity;
}
