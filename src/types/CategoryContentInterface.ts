import { Document, Schema } from 'mongoose';

import { VisibilityStatus } from './VisibilityStatusEnum';

export interface CategoryContentInterface extends Document {
  title: string,
  categoryId: Schema.Types.ObjectId,
  description: string,
  body: string,
  status: VisibilityStatus
}
