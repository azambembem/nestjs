import { Injectable } from '@nestjs/common';
import { log } from 'console';

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
      title: '게시판2',
      description: '게시판2입니다.',
    },
    {
      id: 3,
      title: '게시판3',
      description: '게시판3입니다.',
    },
  ];

  findAll() {
    const nextId = this.getNextId();
    console.log(nextId);

    this.getNextId();
    return this.boards;
  }

  find(id: number) {
    const ind = this.boards.findIndex((board) => board.id === id);
    return this.boards[ind];
  }
  create(data) {
    const newBoard = {
      id: this.getNextId(),
      ...data,
    };
    this.boards.push(newBoard);
    return newBoard;
  }

  update(id: number, data) {
    const ind = this.getBoard(id);
    if (ind > -1) {
      this.boards[ind] = {
        ...this.boards[ind],
        ...data,
      };
      return this.boards[ind];
    }
    return null;
  }

  getBoard(id: number) {
    return this.boards.findIndex((board) => board.id === id);
  }
  getNextId() {
    return this.boards.sort((a, b) => b.id - a.id)[0].id + 1;
  }
}
