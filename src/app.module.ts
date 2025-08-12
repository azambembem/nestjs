import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardModule } from './board/board.module';
import ConfigModule from './config';

@Module({
  imports: [ConfigModule(), BoardModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
