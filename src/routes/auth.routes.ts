import { Router } from "express";
import { authenticated } from "../controllers/auth.controller";
const router = Router();


router.post('/auth/login', authenticated);


export default router;