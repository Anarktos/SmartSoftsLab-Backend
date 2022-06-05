import { Request, Response, NextFunction } from 'express';
import { UserRepository } from '../repositories/user.repository';
import jsonwebtoken from 'jsonwebtoken';


export const authenticated = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { name, password } = req.body;
  try {
    const user = await UserRepository.validateUser({ name, password })
    if (!user) return res.status(404).json({ message: 'user not found' });
    const payload = {
      id: user.id,
      name: user.name,
    }
    const token = jsonwebtoken.sign(payload, 'secret', { expiresIn: '3600s' });
    return res.status(200).json({
      message: 'Authenticated',
      token,
    })
  } catch (error) {
    next(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}