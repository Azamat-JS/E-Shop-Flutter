import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    addToCart(createCartDto: CreateCartDto): Promise<import("./entities/cart.entity").CartEntity>;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateCartDto: UpdateCartDto): string;
    remove(id: string): string;
}
