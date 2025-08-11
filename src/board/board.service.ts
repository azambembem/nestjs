import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardService {
  private boards = [
    {
      id: 1,
      title: '게시판1',
      description: '게시판1입니다.',
    },
    {
      id: 2,
      title: '게시판2',
      description: '게시판2입니다.',
    },
    {
      id: 3,
      title: '게시판3',
      description: '게시판3입니다.',
    },
  ];

  findAll() {
    return this.boards;
  }

  find(id: number) {
    const index = this.boards.findIndex((board) => board.id === id);
    return this.boards[index];
  }
}
