import { IsNotEmpty, IsString } from "class-validator";

export class ProductCategoryInput {
  @IsString()
  @IsNotEmpty({ message: "Title must not be empty" })
  title: String;
}
