import { In } from 'typeorm';
import { Product } from '../entities/Product';


export class ProductRepository {
  
    async createProduct(body: any): Promise<Product | undefined> {
      try {
        const product = new Product();
        product.name = body.name;
        product.price = body.price;
        product.category = body.category;
        product.quantity = body.quantity;
        await product.save();
        return product;
      } catch (error) {
        console.log(error);
        return undefined;
      }
    }
  
    async getProducts(): Promise<Product[] | undefined> {
      try {
        const products = await Product.find();
        if(!products) return undefined;
        return products;
      } catch (error) {
        console.log(error);
        return undefined;
      }
    }
  
    async getProduct(id: number): Promise<Product | undefined> {
      try {
        const product = await Product.findOne({where: {id}});
        if (!product) return undefined;
        return product;
      } catch (error) {
        console.log(error);
        return undefined;
      }
    }

    async getProductsByIds(ids: number[]): Promise<Product[] | undefined> {
      try {
        const products = await Product.findBy({id: In(ids)});
        if(!products) return undefined;
        return products;
      } catch (error) {
        console.log(error);
        return undefined;
      }
      
    }
  
    async updateProduct(id: number, body: any): Promise<Product | undefined> {
      try {
        const product = await Product.findOne({where: {id}});
        if (!product) return undefined;
        product.name = body.name;
        product.price = body.price;
        product.category = body.category;
        product.quantity = body.quantity;
        await product.save();
        return product;
      } catch (error) {
        console.log(error);
        return undefined;
      }
    }
  
    async deleteProduct(id: number): Promise<any> {
      try {
        const product = await Product.findOne({where: {id}});
        if (!product) return undefined;
        await product.remove();
        return true;
      } catch (error) {
        console.log(error);
        return undefined;
      }
    }
}
