import { RatingEntity } from "./ratings.entity";
export declare class ProductEntity {
    id: string;
    name: string;
    description: string;
    images: string[];
    quantity: number;
    price: number;
    category: string;
    ratings: RatingEntity[];
}
