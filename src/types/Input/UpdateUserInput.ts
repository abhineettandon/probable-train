import { IsString, IsNotEmpty, IsEnum } from "class-validator";
import { RolesEnum } from "../RolesEnum";

export class UpdateUserInput {
  @IsString()
  @IsNotEmpty({ message: 'Firstname shouuld not be empty' })
  firstName: string;

  @IsString()
  @IsNotEmpty({ message: 'Lastname should not be empty' })
  lastName: string

  @IsEnum(RolesEnum, { message: 'Invalid role specified.' })
  role: RolesEnum;
}