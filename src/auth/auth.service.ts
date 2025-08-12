import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async hashPassword(password: string): Promise<string> {
    console.log(password);
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  async register(name: string, email: string, password: string) {
    const hashedPassword = await this.hashPassword(password);

    const userExits = await this.userRepository.findOne({
      where: {
        email,
      },
    });
    if (userExits) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const user = this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });
    await this.userRepository.save(user);
    return user;
  }
}
