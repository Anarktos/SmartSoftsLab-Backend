import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  BaseEntity
} from 'typeorm';

import { ProductPurchase } from './ProductPurchase';

@Entity('users')
export class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({length: 100})
  name: string;

  @Column('float')
  money: number;

  @Column({length: 255})
  password: string;

  @OneToMany(() => ProductPurchase, productPurchase => productPurchase.user)
  purchases: ProductPurchase[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

}