import { CreateAuthDto, LoginDto } from './dto/create-auth.dto';
import { AuthEntity } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private authRepo;
    private readonly jwtService;
    constructor(authRepo: Repository<AuthEntity>, jwtService: JwtService);
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
}
