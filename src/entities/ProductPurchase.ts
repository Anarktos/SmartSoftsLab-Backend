import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinTable,
  ManyToMany,
  BaseEntity
} from 'typeorm';

import { User } from './User';
import { Product } from './Product';


@Entity('product_purchases')
export class ProductPurchase extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => Product, product => product.purchases)
  @JoinTable()
  products: Product[];

  @ManyToOne(() => User, user => user.purchases)
  user: User;

  @CreateDateColumn()
  purchaseDate: Date;

  @Column('float')
  total: number;

}