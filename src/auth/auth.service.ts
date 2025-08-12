import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
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
    private jwtService: JwtService,
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
      isVerified: false,
    });
    await this.userRepository.save(user);

    // Tasdiqlash tokeni yaratamiz
    const token = this.jwtService.sign({ email });

    // Tasdiqlash emailini yuboramiz
    await this.mailService.sendVerificationMail(email, token);

    return { message: 'Tasdiqlash uchun emailingizni tekshiring' };
  }

  async verifyEmail(token: string) {
    try {
      const decoded = this.jwtService.verify<{ email: string }>(token);
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
