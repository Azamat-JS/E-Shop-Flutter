import { Repository } from 'typeorm';
import { CartEntity } from './entities/cart.entity';
import { AuthEntity } from "../auth/entities/auth.entity";
import { ProductEntity } from "../product/entities/product.entity";
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
export declare class CartService {
    private readonly cartRepo;
    private readonly userRepo;
    private readonly productRepo;
    constructor(cartRepo: Repository<CartEntity>, userRepo: Repository<AuthEntity>, productRepo: Repository<ProductEntity>);
    addToCart(createCartDto: CreateCartDto): Promise<CartEntity>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, _updateCartDto: UpdateCartDto): string;
    remove(id: number): string;
}
