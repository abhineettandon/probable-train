import {
  IsMongoId,
  IsNotEmpty,
  IsEnum,
  IsString,
  ValidateIf,
} from "class-validator";

import { Schema } from "mongoose";
import { ContentTypeEnum } from "../../types/ContentTypeEnum";
import { VisibilityStatus } from "../../types/VisibilityStatusEnum";

export class ContentInput {
  @IsString()
  @IsNotEmpty({ message: "Title should not be empty." })
  title: String;

  @IsString()
  description: String;

  @IsMongoId()
  @IsNotEmpty({ message: "Category ID should not be empty" })
  categoryId: Schema.Types.ObjectId;

  @IsEnum(ContentTypeEnum)
  contentType: ContentTypeEnum;

  @IsString()
  @ValidateIf((o) => o.contentType === ContentTypeEnum.POST)
  @IsNotEmpty({ message: "Body should not be empty" })
  body: String;

  @IsEnum([VisibilityStatus.DRAFT, VisibilityStatus.PUBLISHED])
  @ValidateIf((o) => o.contentType === ContentTypeEnum.POST)
  status: VisibilityStatus.DRAFT | VisibilityStatus.PUBLISHED;
}
