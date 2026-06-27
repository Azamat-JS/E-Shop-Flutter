import { CreateCartDto } from "../../cart/dto/create-cart.dto";
export declare class CreateProductDto {
    name: string;
    description: string;
    category: string;
    images: string[];
    quantity: number;
    price: number;
}
export declare class UpdateProductDto {
    name?: string;
    description?: string;
    category?: string;
    images?: string[];
    quantity?: number;
    price?: number;
    rating?: number;
}
export declare class OrderDto {
    cart: CreateCartDto;
    totalPrice: number;
    address: string;
}
