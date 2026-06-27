import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Req, UnauthorizedException } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto, OrderDto, UpdateProductDto } from './dto/create-product.dto';
import { JwtAuthGuard } from 'src/utils/jwt.guard';
import { Roles } from 'src/utils/roles';
import { RolesGuard } from 'src/utils/roles.guard';
import type { AuthenticatedRequest } from 'src/utils/types/types';
import { RateProductDto } from './dto/rate-product.dto';

@UseGuards(JwtAuthGuard)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Get('get-all')
  findAll() {
    return this.productService.findAll();
  }

  @Get('get-by-category')
  findByCategory(@Query('category') category: string) {
    return this.productService.findByCategory(category);
  }

  @Get('deal-of-day')
  dealOfDay() {
    return this.productService.dealOfDay();
  }

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Post('add-product')
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Post('order')
  orderProduct(@Body() orderDto: OrderDto) {
    return this.productService.orderProduct(orderDto);
  }

  @Get('search/:productName')
  searchProduct(@Param('productName') productName: string) {
    return this.productService.searchProduct(productName);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Post('rate-product/:productId')
  rateProduct(@Param('productId') productId: string, @Body() dto: RateProductDto, @Req() req: AuthenticatedRequest) {
    const userId = req.user?.id
    if (!userId) {
      throw new UnauthorizedException("Please login for rating!")
    }
    return this.productService.rateProduct(productId, userId, dto)
  }



  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProductDto: CreateProductDto) {
  //   return this.productService.update(id, updateProductDto);
  // }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
