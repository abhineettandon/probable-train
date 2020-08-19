import { IsNotEmpty, IsString, IsEnum, IsMongoId } from 'class-validator';
import { Schema } from 'mongoose';

import { VisibilityStatus } from '../../types/VisibilityStatusEnum';

export class CategotyContentInput {
  @IsString()
  @IsNotEmpty({ message: 'Title should not be empty' })
  title: string

  @IsMongoId({ message: 'Category Id is not valid' })
  @IsNotEmpty({ message: 'Category Id should not be empty' })
  categoryId: Schema.Types.ObjectId;

  @IsString()
  description: string;

  @IsString()
  body: string;

  @IsEnum(VisibilityStatus)
  @IsNotEmpty({ message: 'Status should not be empty' })
  status: VisibilityStatus;
}
