import { IsNotEmpty, IsString } from "class-validator";

export class CategoryInput {
  @IsString()
  @IsNotEmpty({ message: "Title must not be empty" })
  title: String;
}
