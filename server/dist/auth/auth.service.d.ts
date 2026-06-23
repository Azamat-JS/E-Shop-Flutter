import { CreateAuthDto, LoginDto } from './dto/create-auth.dto';
import { AuthEntity } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ImageKitService } from "../utils/imagekit.service";
import { CartEntity } from "../cart/entities/cart.entity";
export declare class AuthService {
    private authRepo;
    private cartRepo;
    private readonly jwtService;
    private readonly imageKitService;
    constructor(authRepo: Repository<AuthEntity>, cartRepo: Repository<CartEntity>, jwtService: JwtService, imageKitService: ImageKitService);
    register(createAuthDto: CreateAuthDto): Promise<AuthEntity>;
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
    tokenIsValid(token: string): Promise<boolean>;
    getUserData(token: string): Promise<{
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
