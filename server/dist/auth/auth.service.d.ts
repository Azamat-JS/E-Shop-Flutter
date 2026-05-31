import { CreateAuthDto, UpdateAuthDto } from './dto/create-auth.dto';
import { AuthEntity } from './entities/auth.entity';
import { Repository } from 'typeorm';
export declare class AuthService {
    private authRepo;
    constructor(authRepo: Repository<AuthEntity>);
    register(createAuthDto: CreateAuthDto): Promise<AuthEntity>;
    findAll(): string;
    findOne(id: string): void;
    update(id: string, updateAuthDto: UpdateAuthDto): string;
    remove(id: string): string;
}
