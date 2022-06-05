
import { User } from '../entities/User';
import { ProductPurchase } from '../entities/ProductPurchase';
import { Bcrypt } from '../util/bcrypt';



export class UserRepository {

  async createUser(body: any): Promise<User | undefined> {
    try {
      const user = new User();
      user.name = body.name;
      user.money = body.money;
      const password = await Bcrypt.hash(body.password);
      user.password = password;
      await user.save();
      return user;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }

  async findUserById(id: number): Promise<User | undefined> {
    try {
      const user = await User.findOne({ where: { id } });
      if(!user) return undefined;
      return user;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }

  static async validateUser(body: any): Promise<User | undefined> {
    try {
      const user = await User.findOne({ where: { name: body.name } });
      if (user) {
        const isValid = await Bcrypt.compare(body.password, user.password);
        if (isValid) {
          return user;
        }
      }
      return undefined;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }

}