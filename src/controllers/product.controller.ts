import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Delete,
  HttpStatus,
  UseFilters,
} from "@nestjs/common";
import { Product } from '../core/entities/product.entity';
import { ProductService } from '../use-case/product/product.service';
import { AppError } from '../error-handling/app.error';
import { GENERAL_CODES } from '../error-handling/consts/codes/general-codes';
import { HttpExceptionFilter } from '../error-handling/http-exception.filter';
@UseFilters(HttpExceptionFilter)
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
    const product = this.productService.create(
      body.name,
      body.description,
      body.stuck,
      body.price,
    );
    if (!product) {
      throw new AppError(
        GENERAL_CODES.PRODUCT_CREATION_FAILED,
        HttpStatus.BAD_REQUEST,
        true,
      );
    }
    return product;
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
