import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import type { AuthenticatedRequest } from "../utils/types/types";
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    create(createOrderDto: CreateOrderDto): string;
    fetchMyOrders(req: AuthenticatedRequest): Promise<{
        userId: string;
        id: string;
        totalPrice: number;
        user: import("../auth/entities/auth.entity").AuthEntity;
        products: import("../product/entities/product.entity").ProductEntity[];
        quantity: number[];
        address: string;
        status: string;
        orderedAt: Date;
    }[]>;
    findOne(id: string): string;
    update(id: string, updateOrderDto: UpdateOrderDto): string;
    remove(id: string): string;
}
