import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateBoardDto {
  @MinLength(2)
  @MaxLength(20)
  title: string;

  @IsNotEmpty({
    message: '내용을 입력해주세요! 빈 내용으로는 안됩니다',
  })
  @MinLength(1)
  @MaxLength(5)
  description: string;
}
