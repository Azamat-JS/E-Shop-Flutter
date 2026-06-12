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
