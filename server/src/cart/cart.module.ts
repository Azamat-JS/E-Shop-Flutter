import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity } from './entities/cart.entity';
import { AuthEntity } from 'src/auth/entities/auth.entity';
import { ProductEntity } from 'src/product/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CartEntity, AuthEntity, ProductEntity])],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
