import { NextFunction, Request, Response } from 'express';
import { check } from 'express-validator';
import { validate } from '../util/validatorHelper';

export const validateProductCreate = [
  check('name').exists().isString().not().isEmpty(),
  check('category').exists().isString().not().isEmpty(),
  check('price').exists().isNumeric().not().isEmpty(),
  check('quantity').exists().isNumeric().not().isEmpty(),
  (req: Request, res: Response, next: NextFunction) => validate(req, res, next),
]

export const validateProductUpdate = [
  check('name').isString(),
  check('category').isString(),
  check('price').isNumeric(),
  check('quantity').isNumeric(),
  (req: Request, res: Response, next: NextFunction) => validate(req, res, next),
]

export const validateUserCreate = [
  check('name').exists().isString().not().isEmpty(),
  check('money').exists().isNumeric().not().isEmpty(),
  check('password').exists().isString().not().isEmpty(),
  (req: Request, res: Response, next: NextFunction) => validate(req, res, next),
]
