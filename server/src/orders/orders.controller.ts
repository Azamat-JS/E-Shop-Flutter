import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UnauthorizedException, Put } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto, UpdateOrderDto } from './dto/create-order.dto';
import { JwtAuthGuard } from 'src/utils/jwt.guard';
import type { AuthenticatedRequest } from 'src/utils/types/types';
import { Roles } from 'src/utils/roles';

@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }


  @Get('me')
  fetchMyOrders(@Req() req: AuthenticatedRequest) {
    const userId = req.user?.id;
    if (!userId) {
      throw new UnauthorizedException('Please login to place an order');
    }
    return this.ordersService.fetchMyOrders(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  @Get('get-all')
  findAll() {
    return this.ordersService.findAll();
  }

  @Put('update-status/:id')
  updateStatus(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
