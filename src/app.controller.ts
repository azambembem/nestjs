import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Ip,
  Logger,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  private readonly logger = new Logger();

  @Get()
  getHello(@Ip() ip: string): string {
    console.log(ip);
    return this.appService.getHello();
    throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
  }

  @Get('name')
  getName(@Query('name') name: string): string {
    return ` ${name} hello `;
  }
}
