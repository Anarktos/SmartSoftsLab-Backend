import * as bcrypt from 'bcrypt';

const SALT = 10;

export class Bcrypt {
  static async hash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(SALT);
    return await bcrypt.hash(password, salt);
  }

  static async compare(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
