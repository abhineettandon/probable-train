import { Document, Schema } from 'mongoose'

import { VisibilityStatus } from './VisibilityStatusEnum';

export interface ProductCategoryInterface extends Document {
  title: string,
  productId: Schema.Types.ObjectId,
  description: string,
  status: VisibilityStatus,
  tags: string[],
  lockedPageContent: string
}
