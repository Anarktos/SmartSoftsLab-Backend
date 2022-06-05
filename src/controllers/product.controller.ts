import { Request, Response, NextFunction } from 'express';
import { ProductRepository } from '../repositories/pruduct.repository';



export class ProductController {

  private productRepository: ProductRepository;

  constructor() { 
    this.productRepository = new ProductRepository();
  }

  async createProduct(req: Request, res: Response, next: NextFunction): Promise<any | undefined> {
    try {
      const product = await this.productRepository.createProduct(req.body);
      if (!product) return res.status(400).json({ message: 'Product not created' });
      return res.status(201).json(product);
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }

  async getProducts(req: Request, res: Response, next: NextFunction): Promise<any | undefined> {
    try {
      const products = await this.productRepository.getProducts();
      if (!products) return res.status(204).json({ message: 'No products found' });
      return res.status(200).json(products);
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }

  async getProductById(req: Request, res: Response, next: NextFunction): Promise<any | undefined> {
    try {
      const product = await this.productRepository.getProduct(parseInt(req.params.id));
      if (!product) return res.status(404).json({ message: 'Product not found' });
      return res.status(200).json(product);
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }

  async updateProduct(req: Request, res: Response, next: NextFunction): Promise<any | undefined> {
    try {
      const product = await this.productRepository.updateProduct(parseInt(req.params.id), req.body);
      if (!product) return res.status(404).json({ message: 'Product not found' });
      return res.status(200).json(product);
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }

  async deleteProduct(req: Request, res: Response, next: NextFunction): Promise<any | undefined> {
    try {
      const product = await this.productRepository.deleteProduct(parseInt(req.params.id));
      if (!product) return res.status(404).json({ message: 'Product not found' });
      return res.status(200).json({ message: 'Product deleted' });
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }
}
