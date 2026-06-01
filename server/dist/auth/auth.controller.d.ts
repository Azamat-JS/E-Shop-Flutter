import { AuthService } from './auth.service';
import { CreateAuthDto, LoginDto } from './dto/create-auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(createAuthDto: CreateAuthDto): Promise<import("./entities/auth.entity").AuthEntity>;
    login(loginDto: LoginDto): Promise<{
        id: string;
        name: string;
        email: string;
        password: string;
        address?: string;
        role?: string;
        created_at: Date;
        token: string;
    }>;
}
