import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderEntity } from './entities/order.entity';
import { Repository } from 'typeorm';
import { AuthEntity } from "../auth/entities/auth.entity";
export declare class OrdersService {
    private readonly orderRepo;
    private readonly authRepo;
    constructor(orderRepo: Repository<OrderEntity>, authRepo: Repository<AuthEntity>);
    create(createOrderDto: CreateOrderDto): string;
    fetchMyOrders(userId: string): Promise<OrderEntity[]>;
    findOne(id: number): string;
    update(id: number, updateOrderDto: UpdateOrderDto): string;
    remove(id: number): string;
}
