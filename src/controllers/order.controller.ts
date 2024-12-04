import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  HttpStatus,
  UseGuards,
  Req,
  UseFilters,
} from '@nestjs/common';
import { OrderService } from '../use-case/order/order.service';
import { UserService } from '../use-case/user/user.service';
import { ProductService } from '../use-case/product/product.service';
import { AppError } from '../error-handling/app.error';
import { GENERAL_CODES } from '../error-handling/consts/codes/general-codes';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { HttpExceptionFilter } from '../error-handling/http-exception.filter';

@UseFilters(HttpExceptionFilter)
@Controller('orders')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly userService: UserService,
    private readonly productService: ProductService,
  ) {}

  @Post('purchase')
  @UseGuards(JwtAuthGuard)
  async createOrder(
    @Req() req: any,
    @Body() body: { productId: number; state: string },
  ) {
    const user = req.user;
    const product = await this.productService.findOne(body.productId);

    if (!user) {
      throw new AppError(
        GENERAL_CODES.USER_NOT_FOUND,
        HttpStatus.BAD_REQUEST,
        true,
      );
    }
    if (!product) {
      throw new AppError(
        GENERAL_CODES.PRODUCT_NOT_FOUND,
        HttpStatus.BAD_REQUEST,
        true,
      );
    }

    if (product.stuck > 0) {
      console.log(product.stuck);
      const order = await this.orderService.createOrder(
        user,
        product,
        body.state,
      );
      console.log(order);
      if (!order) {
        throw new AppError(
          GENERAL_CODES.ORDER_CREATION_FAILED,
          HttpStatus.BAD_REQUEST,
          true,
        );
      }
      await this.productService.decrementProduct(body.productId);
      return order;
    }
    throw new AppError(
      GENERAL_CODES.OUT_OF_STUCK,
      HttpStatus.BAD_REQUEST,
      true,
    );
  }

}
