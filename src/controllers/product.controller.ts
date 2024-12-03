import { Controller, Get, Post, Param, Body, Delete } from '@nestjs/common';
import { Product } from '../core/entities/product.entity';
import { ProductService } from '../use-case/product/product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(
    @Body()
    body: {
      name: string;
      description: string;
      stuck: number;
      price: number;
    },
  ): Promise<Product> {
    return this.productService.create(
      body.name,
      body.description,
      body.stuck,
      body.price,
    );
  }

  @Get()
  findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Product> {
    return this.productService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.productService.remove(id);
  }
}
