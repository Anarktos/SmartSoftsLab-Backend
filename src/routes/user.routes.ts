import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { validateUserCreate } from '../middlewares/validators';


const router = Router();
const userController = new UserController();

router.post('/user/create', validateUserCreate ,userController.createUser.bind(userController));


export default router;