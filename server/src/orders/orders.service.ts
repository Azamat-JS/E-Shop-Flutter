import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto, UpdateOrderDto } from './dto/create-order.dto';
import { OrderEntity } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthEntity } from 'src/auth/entities/auth.entity';
import { Categories } from 'src/utils/types/types';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderEntity) private readonly orderRepo: Repository<OrderEntity>,
    @InjectRepository(AuthEntity) private readonly authRepo: Repository<AuthEntity>,

  ) { }

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

  async getAnalytics() {
    const totalOrders = await this.orderRepo.count();
    const totalRevenue = await this.orderRepo
      .createQueryBuilder('order')
      .select('SUM(order.totalPrice)', 'totalRevenue')
      .getRawOne();

    let mobileEarnings = await this.fetchCategoryAnalytics(Categories.MOBILES);
    let essentialsEarnings = await this.fetchCategoryAnalytics(Categories.ESSENTIALS);
    let appliancesEarnings = await this.fetchCategoryAnalytics(Categories.APPLIANCES);
    let booksEarnings = await this.fetchCategoryAnalytics(Categories.BOOKS);
    let fashionEarnings = await this.fetchCategoryAnalytics(Categories.FASHION);

    return {
      totalOrders,
      totalRevenue: parseFloat(totalRevenue.totalRevenue) || 0,
      mobileEarnings,
      essentialsEarnings,
      appliancesEarnings,
      booksEarnings,
      fashionEarnings,
    };
  }

  async fetchCategoryAnalytics(category: Categories) {
    const orders = await this.orderRepo
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.products', 'product')
      .where('product.category = :category', { category })
      .getMany();

    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + parseFloat(order.totalPrice.toString()), 0);

    return {
      category,
      totalOrders,
      totalRevenue,
    };
  }

  async create(createOrderDto: CreateOrderDto) {
    const order = this.orderRepo.create(createOrderDto);
    return this.orderRepo.save(order);
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
