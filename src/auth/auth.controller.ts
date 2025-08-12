import { Body, Controller, Post } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(protected authService: AuthService) {}

  @Post('register')
  register(@Body() registerDto: RegisterDto) {}
}
