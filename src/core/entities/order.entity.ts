import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Product } from './product.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.orders, { eager: true })
  user: User;

  @ManyToOne(() => Product, (product) => product.orders, {
    eager: true,
    onDelete: 'CASCADE',
  })
  product: Product;
  @Column()
  state: string;
}
