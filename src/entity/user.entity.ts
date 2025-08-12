import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'name', example: '홍길동' })
  @Column({ unique: true })
  name: string;

  @ApiProperty({ description: 'email', example: 'Hc5yj@example.com' })
  @Column()
  email: string;

  @ApiProperty({ description: 'password', example: '1234' })
  @Column()
  password: string;

  @ApiProperty({ description: 'isVerified', example: true })
  @Column()
  isVerified: boolean;

  @ApiProperty({ description: 'update date', example: 'update-date' })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({ description: 'create date', example: 'date' })
  @CreateDateColumn()
  createdAt: Date;
}
