import { IsString, IsNotEmpty, IsEnum } from "class-validator";

import { VisibilityStatus } from "../../types/VisibilityStatusEnum";

export class PostInput {
  @IsString()
  @IsNotEmpty({ message: "Title should not be empty" })
  title: String;

  @IsString()
  description: String;

  @IsString()
  body: String;

  @IsEnum([VisibilityStatus.PUBLISHED, VisibilityStatus.DRAFT])
  status: VisibilityStatus.PUBLISHED | VisibilityStatus.DRAFT;
}
