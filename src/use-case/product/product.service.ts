import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../core/entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(
    name: string,
    description: string,
    stuck: number,
    price: number,
  ): Promise<Product> {
    const product = this.productRepository.create({
      name,
      description,
      stuck,
      price,
    });
    return this.productRepository.save(product);
  }

  findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  findOne(id: number): Promise<Product> {
    // @ts-ignore
    return this.productRepository.findOne({
      where: { id },
    });
  }

  async decrementProduct(id: number) {
    await this.productRepository
      .createQueryBuilder()
      .update(Product)
      .set({ stuck: () => `stuck - 1` })
      .where('id = :id', { id: id })
      .execute();
  }

  async remove(id: number) {
    const deleted = await this.productRepository.delete(id);
    return deleted.affected;
  }
}
