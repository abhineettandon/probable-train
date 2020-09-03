import { IsNotEmpty, IsString } from "class-validator";

export class GroupInput {
  @IsString()
  @IsNotEmpty({ message: "Title must not be empty" })
  title: String;
}
