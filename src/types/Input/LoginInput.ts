import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginInput {
  @IsEmail({}, { message: 'Enter a valid email' })
  email: string;

  @IsNotEmpty({ message: 'Password should not be empty' })
  password: string;
}