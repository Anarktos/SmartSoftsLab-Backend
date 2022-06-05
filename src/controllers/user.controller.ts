import { Request, Response, NextFunction } from 'express';
import { UserRepository } from '../repositories/user.repository';

export class UserController {

  private userRepository: UserRepository;

  constructor() { 
    this.userRepository = new UserRepository();
  }

  async createUser(req: Request, res: Response, next: NextFunction) {
    const { name, money, password } = req.body;
    try {
      const user = await this.userRepository.createUser({ name, money, password });
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }

}