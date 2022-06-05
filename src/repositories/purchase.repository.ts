import { ProductPurchase } from "../entities/ProductPurchase";
import { ProductRepository } from "./pruduct.repository";
import { UserRepository } from "./user.repository";


export class ProductPurchaseRepository {

  private userRepository: UserRepository;
  private productRepository: ProductRepository;


  constructor() {
    this.userRepository = new UserRepository();
    this.productRepository = new ProductRepository();
  }


  private calculatedTotal(products: any[], quantities: any[]): number {
    let total = 0;
    for (let i = 0; i < products.length; i++) {
      total += products[i].price * quantities[i];
    }
    return total;
  }

  private async updateQuantity(products: any[], quantities: any[]): Promise<string | void> {
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      if (product.quantity >= 1 && product.quantity >= quantities[i]) {
        product.quantity -= quantities[i];
        await product.save();
      }
      else {
        return 'error#1';
      }
    }
  }

  private async updateMoney(user: any, total: number): Promise<string | void> {
    if (user.money >= total) {
      user.money -= total;
      await user.save();
    }
    else {
      return 'error#2'
    }
  }

  async createPurchase(body: any, id: any): Promise<ProductPurchase | undefined | string> {
    try {
      
      const user = await this.userRepository.findUserById(id);
      const products = await this.productRepository.getProductsByIds(body.productIds);
      if (!user || !products) return undefined;
      
      const purchase = new ProductPurchase();
      purchase.user = user;
      purchase.products = products;
      purchase.total = this.calculatedTotal(products, body.quantities);
      
      
      
      const updatedM = await this.updateMoney(user, purchase.total);
      if (updatedM) return updatedM;

      const updatedQ = await this.updateQuantity(products, body.quantities);
      if (updatedQ) return updatedQ;
      
      await purchase.save();
      return purchase;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }
}