import { Request, Response, NextFunction } from "express";
import { ProductPurchaseRepository } from "../repositories/purchase.repository";
import { decode } from "../util/decode";




export class PurchaseController {

  private purchaseRepository: ProductPurchaseRepository;

  constructor() {
    this.purchaseRepository = new ProductPurchaseRepository();
  }

  async createPurchase(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const userId = await decode(req.headers.authorization);
      const purchase = await this.purchaseRepository.createPurchase(req.body, userId);
      if (purchase === 'error#1') return res.status(400).send('Not enough products');
      if (purchase === 'error#2') return res.status(400).send('Not enough money');
      if (!purchase) return res.status(400).json({ message: 'Purchase not created' });
      return res.status(200).json(purchase);
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }
}


