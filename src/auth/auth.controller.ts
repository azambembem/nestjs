import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { log } from 'console';

@Controller('auth')
export class AuthController {
  constructor(protected authService: AuthService) {}

  @Post('register')
  register(@Body() body: { name: string; email: string; password: string }) {
    return {
      message: 'User registered successfully',
      data: body,
    };
  }
}
