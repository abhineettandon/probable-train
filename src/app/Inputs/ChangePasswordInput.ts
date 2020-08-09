import { IsString, Length } from 'class-validator';

export class ChangePasswordInput {
  @IsString({ message: 'Current Password should not be empty.' })
  currentPassword: string;

  @IsString({ message: 'New Password shouild not be empty' })
  @Length(6)
  newPassword: string;
}
