import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto, UpdateOrderDto } from './dto/create-order.dto';
import { OrderEntity } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthEntity } from 'src/auth/entities/auth.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderEntity) private readonly orderRepo: Repository<OrderEntity>,
    @InjectRepository(AuthEntity) private readonly authRepo: Repository<AuthEntity>,

  ) { }
  create(createOrderDto: CreateOrderDto) {

    return 'This action adds a new order';
  }

  async fetchMyOrders(userId: string) {
    const foundUser = await this.authRepo.findOneBy({ id: userId });
    if (!foundUser) {
      throw new NotFoundException("User not found")
    }
    const orders = await this.orderRepo.find({
      where: { user: { id: foundUser.id } },
      relations: { products: true },
    });
    return orders.map((order) => ({ ...order, userId: foundUser.id }));
  }

  async findAll() {
    const orders = await this.orderRepo.find({
      relations: { user: true, products: true },
    });
    return orders.map((order) => {
      const { user, ...rest } = order;
      return { ...rest, userId: user?.id };
    });
  }

  async updateStatus(id: string, updateOrderDto: UpdateOrderDto) {
    const order = await this.orderRepo.findOneBy({ id });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    order.status = updateOrderDto.status;
    return this.orderRepo.save(order);
  }

  remove(id: string) {
    return `This action removes a #${id} order`;
  }
}
