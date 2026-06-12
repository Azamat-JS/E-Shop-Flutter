import { RatingEntity } from "../../product/entities/ratings.entity";
export declare class AuthEntity {
    id: string;
    name: string;
    email: string;
    password: string;
    address?: string;
    type?: string;
    ratings: RatingEntity[];
    created_at: Date;
}
