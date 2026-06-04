import { AuthService } from './auth.service';
import { CreateAuthDto, LoginDto } from './dto/create-auth.dto';
import type { AuthenticatedRequest } from "../utils/types/types";
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
        type?: string;
        created_at: Date;
        token: string;
    }>;
    tokenIsValid(req: AuthenticatedRequest): false | Promise<boolean>;
    getUserData(req: AuthenticatedRequest): Promise<import("./entities/auth.entity").AuthEntity>;
    getAuthParams(): Promise<{
        token: string;
        expire: number;
        signature: string;
    }>;
}
