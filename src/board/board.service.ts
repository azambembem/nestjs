import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardService {
  findAll() {
    return 'This action returns all board';
  }
}
