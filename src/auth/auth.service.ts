import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  async hashPassword(password: string): Promise<string> {
    console.log(password);
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  async register(name: string, email: string, password: string) {
    const hashedPassword = await this.hashPassword(password);
    return {
      name,
      email,
      password: hashedPassword,
    };
  }
}
