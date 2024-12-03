import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../../use-case/order/order.entity';
import { User } from './user.entity';
import { Product } from './product.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  createOrder(user: User, product: Product, state: string): Promise<Order> {
    // @ts-ignore
    const order = this.orderRepository.create({
      user,
      product,
      state,
    });
    // @ts-ignore
    return this.orderRepository.save(order);
  }

  findAll(): Promise<Order[]> {
    return this.orderRepository.find();
  }

  findByUser(userId: number): Promise<Order[]> {
    return this.orderRepository.find({ where: { user: { id: userId } } });
  }
}
