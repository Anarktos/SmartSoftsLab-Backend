import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import passport from 'passport';
import jsyml from 'js-yaml';
import { readFileSync } from 'fs';
import swaggerUI from 'swagger-ui-express';

import userRoutes from './routes/user.routes';
import purchaseRoutes from './routes/purchase.routes';
import productRoutes from './routes/product.routes';
import authRoutes from './routes/auth.routes';
const app = express();


//config
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());


//doc
const doc: any = jsyml.load(readFileSync('src/documentation/documentation.yml', 'utf8'));

//routes
app.use(userRoutes);
app.use(purchaseRoutes);
app.use(productRoutes);
app.use(authRoutes);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(doc));



export default app;