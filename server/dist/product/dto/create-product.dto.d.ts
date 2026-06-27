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
export declare class OrderProductDto {
    id: string;
    quantity: number;
}
export declare class OrderDto {
    products: OrderProductDto[];
    totalPrice: number;
    address: string;
}
