import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './core/entities/order.entity';
import { Product } from './core/entities/product.entity';
import { User } from './core/entities/user.entity';
import { UserModule } from './use-case/user/user.module';
import { ProductModule } from './use-case/product/product.module';
import { OrderModule } from './use-case/order/order.module';
import { JwtAuthModule } from './frameworks/auth-service/jwt/jwt.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'data.db',
      entities: [User, Product, Order],
      synchronize: true,
    }),
    UserModule,
    ProductModule,
    OrderModule,
    JwtAuthModule,
  ],
})
export class AppModule {}
