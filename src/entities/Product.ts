import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  BaseEntity
} from 'typeorm';

import { ProductPurchase } from './ProductPurchase';


@Entity('products')
export class Product extends BaseEntity {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column({length: 100})
  name: string;

  @Column({length: 100})
  category: string;

  @Column('float')
  price: number;

  @Column('int')
  quantity: number;

  @ManyToMany(() => ProductPurchase, productPurchase => productPurchase.products)
  purchases: ProductPurchase[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
	


}