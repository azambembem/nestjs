import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateBoardDto {
  @MinLength(1)
  @MaxLength(20)
  title: string;

  @IsNotEmpty()
  description: string;
}
