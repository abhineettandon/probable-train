import { IsArray, IsNotEmpty, IsString, IsEnum, IsMongoId } from 'class-validator';
import { Schema } from 'mongoose';

import { VisibilityStatus } from '../../types/VisibilityStatusEnum';

export class ProductCategoryInput {
  @IsString()
  @IsNotEmpty({ message: 'Title should not be empty' })
  title: string

  @IsMongoId({ message: 'Product Id is not valid' })
  @IsNotEmpty({ message: 'Product should not be empty' })
  productId: Schema.Types.ObjectId;

  @IsString()
  description: string;

  @IsEnum(VisibilityStatus)
  @IsNotEmpty({ message: 'Status should not be empty' })
  status: VisibilityStatus;

  @IsArray()
  tags: string[];

  @IsString()
  lockedPageContent: string;
}
