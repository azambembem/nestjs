import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

const { name, email, password } = {
  name: {
    MinLength: 'username must be at least 2 characters',
    IsString: 'username must be a string',
    IsNotEmpty: 'username is required',
  },
  email: {
    IsEmail: 'email must be a valid email',
    IsNotEmpty: 'email is required',
  },
  password: {
    IsNotEmpty: 'password is required',
    MinLength: 'password must be at least 6 characters',
  },
};

export class RegisterDto {
  @MinLength(2, { message: name.MinLength })
  @IsNotEmpty({ message: name.IsNotEmpty })
  @IsString({ message: name.IsString })
  name: string;

  @IsNotEmpty({ message: email.IsNotEmpty })
  @IsEmail({}, { message: email.IsEmail }) // {} bu yerga options ham qo‘yiladi
  email: string;

  @IsNotEmpty({ message: password.IsNotEmpty })
  @MinLength(6, { message: password.MinLength })
  password: string;
}
