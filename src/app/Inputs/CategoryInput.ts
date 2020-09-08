import {
  IsEnum,
  IsString,
  IsNotEmpty,
  IsMongoId,
  IsOptional,
} from "class-validator";
import { Types } from "mongoose";

import { VisibilityStatus } from "../../types/VisibilityStatusEnum";

export class CategoryInput {
  @IsString()
  @IsNotEmpty({ message: "Title should not be empty." })
  title: String;

  @IsString()
  description: String;

  @IsMongoId()
  @IsNotEmpty({ message: "Product Id should not be empty" })
  productId: Types.ObjectId;

  @IsOptional()
  @IsMongoId()
  parentCategoryId: Types.ObjectId;

  @IsEnum(VisibilityStatus)
  status: VisibilityStatus;

  @IsString({ each: true })
  @IsNotEmpty({ message: "Tags must not be empty." })
  tags: String[];

  @IsString()
  lockedPageContent: String;
}
