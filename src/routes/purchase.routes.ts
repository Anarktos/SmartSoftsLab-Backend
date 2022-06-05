import { Router } from "express";
import { PurchaseController } from "../controllers/purchase.controller";

import passport from '../middlewares/passport';

const purchaseController = new PurchaseController();

const router = Router();

router.post('/buy', passport.authenticate('jwt', {session: false}) ,purchaseController.createPurchase.bind(purchaseController));


export default router;

