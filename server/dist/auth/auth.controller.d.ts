import { AuthService } from './auth.service';
import { AddressDto, CreateAuthDto, LoginDto } from './dto/create-auth.dto';
import type { AuthenticatedRequest } from "../utils/types/types";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(createAuthDto: CreateAuthDto): Promise<import("./entities/auth.entity").AuthEntity>;
    login(loginDto: LoginDto): Promise<{
        cart: {
            product: import("../product/entities/product.entity").ProductEntity;
            quantity: number;
        }[];
        id: string;
        name: string;
        email: string;
        password: string;
        address?: string;
        type?: string;
        ratings: import("../product/entities/ratings.entity").RatingEntity[];
        created_at: Date;
        token: string;
    }>;
    tokenIsValid(req: AuthenticatedRequest): false | Promise<boolean>;
    saveUserAddress(addressDto: AddressDto, req: AuthenticatedRequest): false | Promise<import("./entities/auth.entity").AuthEntity>;
    getUserData(req: AuthenticatedRequest): Promise<{
        cart: {
            product: import("../product/entities/product.entity").ProductEntity;
            quantity: number;
        }[];
        id: string;
        name: string;
        email: string;
        password: string;
        address?: string;
        type?: string;
        ratings: import("../product/entities/ratings.entity").RatingEntity[];
        created_at: Date;
    }>;
    getAuthParams(): Promise<{
        token: string;
        expire: number;
        signature: string;
    }>;
}
