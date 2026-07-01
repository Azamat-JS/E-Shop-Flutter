import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
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

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
