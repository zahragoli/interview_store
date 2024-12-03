import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { OrderService } from '../core/entities/order.service';
import { UserService } from '../use-case/user/user.service';
import { ProductService } from '../use-case/product/product.service';

@Controller('orders')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly userService: UserService,
    private readonly productService: ProductService,
  ) {}

  @Post()
  async createOrder(
    @Body() body: { userId: number; productId: number; state: string },
  ) {
    const user = await this.userService.findOne(body.userId);
    const product = await this.productService.findOne(body.productId);

    if (!user || !product) {
      throw new Error('User or Product not found');
    }

    const order = this.orderService.createOrder(user, product, body.state);
    if (!order) {
      throw new Error('User or Product not found');
    }
    await this.productService.decrementProduct(body.productId);
    return order;
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: number) {
    return this.orderService.findByUser(userId);
  }
}
