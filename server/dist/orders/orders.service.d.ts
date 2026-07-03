import { CreateOrderDto, UpdateOrderDto } from './dto/create-order.dto';
import { OrderEntity } from './entities/order.entity';
import { Repository } from 'typeorm';
import { AuthEntity } from "../auth/entities/auth.entity";
export declare class OrdersService {
    private readonly orderRepo;
    private readonly authRepo;
    constructor(orderRepo: Repository<OrderEntity>, authRepo: Repository<AuthEntity>);
    fetchMyOrders(userId: string): Promise<{
        userId: string;
        id: string;
        totalPrice: number;
        user: AuthEntity;
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
    create(createOrderDto: CreateOrderDto): Promise<OrderEntity>;
    updateStatus(id: string, updateOrderDto: UpdateOrderDto): Promise<OrderEntity>;
    remove(id: string): string;
}
