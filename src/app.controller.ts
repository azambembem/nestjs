import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Ip,
  Param,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Ip() ip: string): string {
    // console.log(ip);

    // return this.appService.getHello();
    throw new HttpException('Forbidden', HttpStatus.NOT_FOUND);
  }
  @Get('name')
  getName(@Query('name') name: string): string {
    return ` ${name} hello `;
  }
}
