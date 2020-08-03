import { IsString, IsEmail } from 'class-validator';

import { RolesEnum } from '../RolesEnum'

export class RegisterInput {
  @IsString({ message: 'Firstname is required.' })
  firstName: string;

  @IsString({ message: 'Lastname is required.' })
  lastName: string;

  @IsEmail({}, { message: 'Email should be valid.'})
  email: string;

  @IsString({ message: 'Infusionsoft ID is required' })
  infusionSoftId: string;

  @IsString({ message: 'Role is required' })
  role: RolesEnum
}
