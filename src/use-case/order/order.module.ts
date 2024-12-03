import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { OrderService } from '../../core/entities/order.service';
import { OrderController } from '../../controllers/order.controller';
import { User } from '../../core/entities/user.entity';
import { Product } from '../../core/entities/product.entity';
import { UserService } from '../user/user.service';
import { ProductService } from '../product/product.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order, User, Product])],
  providers: [OrderService, UserService, ProductService],
  controllers: [OrderController],
})
export class OrderModule {}
