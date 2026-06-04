import { CreateAuthDto, LoginDto } from './dto/create-auth.dto';
import { AuthEntity } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ImageKitService } from "../utils/imagekit.service";
export declare class AuthService {
    private authRepo;
    private readonly jwtService;
    private readonly imageKitService;
    constructor(authRepo: Repository<AuthEntity>, jwtService: JwtService, imageKitService: ImageKitService);
    register(createAuthDto: CreateAuthDto): Promise<AuthEntity>;
    login(loginDto: LoginDto): Promise<{
        id: string;
        name: string;
        email: string;
        password: string;
        address?: string;
        type?: string;
        created_at: Date;
        token: string;
    }>;
    tokenIsValid(token: string): Promise<boolean>;
    getUserData(token: string): Promise<AuthEntity>;
    getAuthParams(): Promise<{
        token: string;
        expire: number;
        signature: string;
    }>;
}
