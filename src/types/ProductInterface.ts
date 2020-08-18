import { Document, Schema } from 'mongoose';

import { VisibilityStatus } from './VisibilityStatusEnum';

export interface ProductInterface extends Document {
  title: string;
  productTypeId: Schema.Types.ObjectId;
  description: string;
  status: VisibilityStatus;
  tags: string[];
  lockedPageContent: string;
}
