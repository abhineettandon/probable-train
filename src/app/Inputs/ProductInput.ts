import { IsArray, IsNotEmpty, IsString, IsEnum, IsMongoId } from 'class-validator';
import { Schema } from 'mongoose';

import { VisibilityStatus } from '../../types/VisibilityStatusEnum';

export class ProductInput {
  @IsString()
  @IsNotEmpty({ message: 'Title should not be empty' })
  title: string

  @IsMongoId({ message: 'Product Type Id is not valid' })
  @IsNotEmpty({ message: 'Product Type should not be empty' })
  productTypeId: Schema.Types.ObjectId;

  @IsString()
  description: string;

  @IsEnum(VisibilityStatus)
  status: VisibilityStatus;

  @IsArray()
  tags: string[];

  @IsString()
  lockedPageContent: string;
}
