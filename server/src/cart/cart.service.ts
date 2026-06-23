import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartEntity } from './entities/cart.entity';
import { AuthEntity } from 'src/auth/entities/auth.entity';
import { ProductEntity } from 'src/product/entities/product.entity';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity) private readonly cartRepo: Repository<CartEntity>,
    @InjectRepository(AuthEntity) private readonly userRepo: Repository<AuthEntity>,
    @InjectRepository(ProductEntity) private readonly productRepo: Repository<ProductEntity>,
  ) { }

  async addToCart(createCartDto: CreateCartDto) {
    const { productId, userId, quantity } = createCartDto;

    const user = await this.userRepo.findOneBy({ id: userId });
    if (!user) throw new NotFoundException('User not found');

    const product = await this.productRepo.findOneBy({ id: productId });
    if (!product) throw new NotFoundException('Product not found');

    const existing = await this.cartRepo.findOne({
      where: { user: { id: userId }, product: { id: productId } },
    });

    if (existing) {
      existing.quantity += quantity;
      return this.cartRepo.save(existing);
    }

    const cartItem = this.cartRepo.create({ user, product, quantity });
    return this.cartRepo.save(cartItem);
  }

  findAll() {
    return `This action returns all cart`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cart`;
  }

  update(id: number, _updateCartDto: UpdateCartDto) {
    return `This action updates a #${id} cart`;
  }

  async remove(productId: string, userId: string) {
    const user = await this.userRepo.findOneBy({ id: userId });
    if (!user) throw new NotFoundException('User not found');

    const deletedProduct = await this.cartRepo.delete(productId);

    if (deletedProduct.affected === 0) {
      throw new NotFoundException("Product not found")
    }

    return { message: 'Product deleted successfully!' }
  }
}
