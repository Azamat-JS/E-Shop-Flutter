import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto, OrderDto, UpdateProductDto } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';
import { RatingEntity } from './entities/ratings.entity';
import { AuthEntity } from 'src/auth/entities/auth.entity';
import { OrderEntity } from './entities/order.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity) private readonly productRepo: Repository<ProductEntity>,
    @InjectRepository(RatingEntity) private readonly rateRepo: Repository<RatingEntity>,
    @InjectRepository(AuthEntity) private readonly userRepo: Repository<AuthEntity>,
    @InjectRepository(OrderEntity) private readonly orderRepo: Repository<OrderEntity>,
  ) { }
  async create(createProductDto: CreateProductDto) {
    const product = this.productRepo.create(createProductDto);
    return this.productRepo.save(product);
  }

  findAll() {
    return this.productRepo.find();
  }

  async findOne(id: string) {
    const product = await this.productRepo.findOne({
      where: { id },
      relations: { ratings: { user: true } },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async findByCategory(category: string) {
    if (!category) {
      throw new BadRequestException('Category is required');
    }

    return await this.productRepo.find({
      where: { category },
    });
  }

  async searchProduct(productName: string) {
    const products = await this.productRepo
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.ratings', 'rating')
      .leftJoinAndSelect('rating.user', 'user')
      .where('product.name ILIKE :name', { name: `%${productName}%` })
      .getMany();

    return products;
  }

  async rateProduct(
    productId: string,
    userId: string,
    dto: UpdateProductDto,
  ) {
    const user = await this.userRepo.findOneBy({
      id: userId,
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const product = await this.productRepo.findOne({
      where: { id: productId },
      relations: {
        ratings: true,
      },
    });

    if (!product) {
      throw new NotFoundException("Product not found");
    }

    await this.rateRepo.upsert(
      {
        user,
        product,
        rating: dto.rating,
      },
      ["user", "product"],
    );

    const updatedProduct = await this.productRepo.findOne({
      where: { id: productId },
      relations: {
        ratings: {
          user: true,
        },
      },
    });

    if (!updatedProduct) {
      throw new NotFoundException("Product not found after updating")
    }

    return updatedProduct;
  }

  async orderProduct(userId: string, orderDto: OrderDto) {
    const { products, totalPrice, address } = orderDto;

    const user = await this.userRepo.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const orderedProducts: ProductEntity[] = [];

    for (const item of products) {
      const product = await this.productRepo.findOneBy({ id: item.id });
      if (!product) {
        throw new NotFoundException(`Product with id ${item.id} not found`);
      }
      if (product.quantity < item.quantity) {
        throw new BadRequestException(`Insufficient stock for "${product.name}". Available: ${product.quantity}`);
      }
      product.quantity -= item.quantity;
      await this.productRepo.save(product);
      orderedProducts.push(product);
    }

    const order = this.orderRepo.create({
      user,
      products: orderedProducts,
      totalPrice,
      address,
      status: 'PENDING',
    });

    return this.orderRepo.save(order);
  }


  update(id: string, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  async remove(id: string) {
    const deletedProduct = await this.productRepo.delete(id)
    if (deletedProduct.affected === 0) {
      throw new NotFoundException('Product not found')
    }
    return { message: "Product deleted successfully!" }
  }


  async dealOfDay() {
    let products = await this.productRepo.find({
      relations: { ratings: true },
    });

    products = products.sort((a, b) => {
      let aSum = 0;
      let bSum = 0;

      for (let i = 0; i < a.ratings.length; i++) {
        aSum += a.ratings[i].rating
      }

      for (let i = 0; i < b.ratings.length; i++) {
        bSum += b.ratings[i].rating
      }
      return aSum < bSum ? 1 : -1;
    });
    return products[0];
  }
}
