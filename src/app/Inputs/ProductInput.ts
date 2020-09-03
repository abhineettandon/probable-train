import { IsString, IsNotEmpty, IsMongoId, IsEnum } from "class-validator";
import { Schema } from "mongoose";
import { VisibilityStatus } from "../../types/VisibilityStatusEnum";

export class ProductInput {
  @IsString()
  @IsNotEmpty({ message: "Title must not be empty" })
  title: String;

  @IsString()
  description: String;

  @IsMongoId()
  @IsNotEmpty({ message: "Category ID must not be empty." })
  categoryId: Schema.Types.ObjectId;

  @IsEnum(VisibilityStatus)
  status: VisibilityStatus;

  @IsString({ each: true })
  @IsNotEmpty({ message: "Tags must not be empty." })
  tags: String[];

  @IsString()
  lockedPageContent: String;
}
