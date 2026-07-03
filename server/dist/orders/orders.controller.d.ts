import { OrdersService } from './orders.service';
import { CreateOrderDto, UpdateOrderDto } from './dto/create-order.dto';
import type { AuthenticatedRequest } from "../utils/types/types";
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    create(createOrderDto: CreateOrderDto): Promise<import("./entities/order.entity").OrderEntity>;
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
    findAll(): Promise<{
        userId: string;
        id: string;
        totalPrice: number;
        products: import("../product/entities/product.entity").ProductEntity[];
        quantity: number[];
        address: string;
        status: string;
        orderedAt: Date;
    }[]>;
    getAnalytics(): Promise<{
        totalOrders: number;
        totalRevenue: number;
    }>;
    fetchCategoryAnalytics(category: string): Promise<{
        category: any;
        totalRevenue: number;
    }[]>;
    updateStatus(id: string, updateOrderDto: UpdateOrderDto): Promise<import("./entities/order.entity").OrderEntity>;
    remove(id: string): string;
}
