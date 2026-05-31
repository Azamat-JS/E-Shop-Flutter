import { AuthService } from './auth.service';
import { CreateAuthDto, UpdateAuthDto } from './dto/create-auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(createAuthDto: CreateAuthDto): Promise<import("./entities/auth.entity").AuthEntity>;
    findAll(): string;
    findOne(id: string): void;
    update(id: string, updateAuthDto: UpdateAuthDto): string;
    remove(id: string): string;
}
