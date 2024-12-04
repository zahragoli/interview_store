import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Order } from './order.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
