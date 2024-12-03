import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../core/entities/user.entity';
import { Product } from '../../core/entities/product.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.orders, { eager: true })
  user: User;

  @ManyToOne(() => Product, (product) => product.orders, { eager: true })
  product: Product;
  @Column()
  state: string;
}
