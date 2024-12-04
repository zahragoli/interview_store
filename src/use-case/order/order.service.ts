import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../../core/entities/order.entity';
import { User } from '../../core/entities/user.entity';
import { Product } from '../../core/entities/product.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  createOrder(user: User, product: Product, state: string): Promise<Order> {
    console.log(user, product, state);
    const order = this.orderRepository.create({
      user,
      product,
      state,
    });
    return this.orderRepository.save(order);
  }

  findAll(): Promise<Order[]> {
    return this.orderRepository.find();
  }

  findByUser(userId: number): Promise<Order[]> {
    return this.orderRepository.find({ where: { user: { id: userId } } });
  }
}
