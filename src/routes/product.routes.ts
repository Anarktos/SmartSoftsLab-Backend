import { Router } from "express";
import { ProductController } from "../controllers/product.controller";
import { validateProductCreate, validateProductUpdate } from "../middlewares/validators";
import passport from '../middlewares/passport';

const productController = new ProductController();


const router = Router();

router.get('/products', passport.authenticate('jwt', { session: false }), productController.getProducts.bind(productController));
router.get('/products/:id', passport.authenticate('jwt', { session: false }), productController.getProductById.bind(productController));
router.post('/products/create', passport.authenticate('jwt', { session: false }), validateProductCreate, productController.createProduct.bind(productController));
router.put('/products/update/:id', passport.authenticate('jwt', { session: false }), validateProductUpdate, productController.updateProduct.bind(productController));
router.delete('/products/delete/:id', passport.authenticate('jwt', { session: false }), productController.deleteProduct.bind(productController));

export default router;