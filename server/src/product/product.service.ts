import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';
import { RatingEntity } from './entities/ratings.entity';
import { AuthEntity } from 'src/auth/entities/auth.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity) private readonly productRepo: Repository<ProductEntity>,
    @InjectRepository(RatingEntity) private readonly rateRepo: Repository<RatingEntity>,
    @InjectRepository(AuthEntity) private readonly userRepo: Repository<AuthEntity>,
  ) { }
  async create(createProductDto: CreateProductDto) {
    const product = this.productRepo.create(createProductDto);
    return this.productRepo.save(product);
  }

  findAll() {
    return this.productRepo.find();
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
      .where('product.name ILIKE :name', {
        name: `%${productName}%`,
      })
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

    return updatedProduct;
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
}
