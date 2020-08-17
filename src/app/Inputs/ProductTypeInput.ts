import { IsString, IsNotEmpty } from 'class-validator';

export class ProductTypeInput {
  @IsString()
  @IsNotEmpty({ message: "Title should not be empty" })
  title: string;
}
