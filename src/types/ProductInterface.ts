import { Document, Schema } from 'mongoose';

export interface ProductInterface extends Document {
  title: string;
  productTypeId: Schema.Types.ObjectId;
  description: string;
  status: string;
  tags: string[];
  lockedPageContent: string;
}
