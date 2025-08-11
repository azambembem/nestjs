import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
// import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true, // faqat DTOda mavjud bo'lgan maydonlarni qabul qilish uchun
  //     forbidNonWhitelisted: true,
  //     transform: true, // requestlarni DTOga avtomatik o‘zgartirish uchun
  //   }),
  // );
  const config = new DocumentBuilder()
    .setTitle('Test_NestJS')
    .setDescription('The Test_NestJS API description')
    .setVersion('1.0')
    .addTag('Test_NestJS')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
