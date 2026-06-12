import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto, UpdateProductDto } from './dto/create-product.dto';
import { JwtAuthGuard } from 'src/utils/jwt.guard';
import { Roles } from 'src/utils/roles';
import { RolesGuard } from 'src/utils/roles.guard';

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

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Post('add-product')
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get('search/:productName')
  searchProduct(@Param('productName') productName: string) {
    return this.productService.searchProduct(productName);
  }

  @Post('rate-product/:productId')
  rateProduct(@Param('productId') productId: string, @Body() dto: UpdateProductDto) {
    return this.productService.rateProduct(productId, dto)
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
