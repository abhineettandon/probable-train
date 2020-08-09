import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterInput {
  @IsString({ message: 'Firstname is required.' })
  firstName: string;

  @IsString({ message: 'Lastname is required.' })
  lastName: string;

  @IsEmail({}, { message: 'Email should be valid.'})
  email: string;

  @IsNotEmpty({ message: 'Password field should not be empty' })
  password: string;

  @IsString({ message: 'Infusionsoft ID is required' })
  infusionSoftId: string;
}
