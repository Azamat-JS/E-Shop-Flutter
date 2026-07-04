import { CreateOrderDto, UpdateOrderDto } from './dto/create-order.dto';
import { OrderEntity } from './entities/order.entity';
import { Repository } from 'typeorm';
import { AuthEntity } from "../auth/entities/auth.entity";
import { Categories } from "../utils/types/types";
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
        mobileEarnings: {
            category: Categories;
            totalOrders: number;
            totalRevenue: number;
        };
        essentialsEarnings: {
            category: Categories;
            totalOrders: number;
            totalRevenue: number;
        };
        appliancesEarnings: {
            category: Categories;
            totalOrders: number;
            totalRevenue: number;
        };
        booksEarnings: {
            category: Categories;
            totalOrders: number;
            totalRevenue: number;
        };
        fashionEarnings: {
            category: Categories;
            totalOrders: number;
            totalRevenue: number;
        };
    }>;
    fetchCategoryAnalytics(category: Categories): Promise<{
        category: Categories;
        totalOrders: number;
        totalRevenue: number;
    }>;
    create(createOrderDto: CreateOrderDto): Promise<OrderEntity>;
    updateStatus(id: string, updateOrderDto: UpdateOrderDto): Promise<OrderEntity>;
    remove(id: string): string;
}
