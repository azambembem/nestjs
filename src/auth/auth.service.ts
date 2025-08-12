import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/entity/user.entity';
import { MailService } from 'src/mail/mail.service';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private mailService: MailService,
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

    // Tasdiqlash tokeni yaratamiz
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    // Tasdiqlash emailini yuboramiz
    await this.mailService.sendVerificationMail(email, token);

    return { message: 'Tasdiqlash uchun emailingizni tekshiring' };
  }

  async verifyEmail(token: string) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET) as {
        email: string;
      };
      const user = await this.userRepository.findOne({
        where: { email: decoded.email },
      });
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      user.isVerified = true;
      await this.userRepository.save(user);
      return { message: 'Email verified successfully' };
    } catch (error) {
      console.log(error);
      throw new HttpException('Invalid token', HttpStatus.BAD_REQUEST);
    }
  }
}
