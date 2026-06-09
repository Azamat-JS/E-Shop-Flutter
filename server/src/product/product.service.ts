import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(@InjectRepository(ProductEntity) private readonly productRepo: Repository<ProductEntity>) { }
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
    const products = await this.productRepo.createQueryBuilder('product').where('product.name ILIKE :name', {
      name: `${productName}`
    }).getMany();

    return products;
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
