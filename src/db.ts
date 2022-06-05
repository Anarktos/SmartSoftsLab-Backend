import { DataSource } from 'typeorm';
import { User } from './entities/User';
import { Product } from './entities/Product';
import { ProductPurchase } from './entities/ProductPurchase';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'db',
  username: 'user',
  password: 'password',
  database: 'SmartSofts',
  synchronize: true,
  logging: false,
  entities: [User, Product, ProductPurchase],
  subscribers: [],
  migrations: ['src/migrations/*.ts'],
})