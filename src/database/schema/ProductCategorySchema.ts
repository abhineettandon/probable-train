import { Schema } from 'mongoose';

export const ProductCategorySchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'ProductType',
    required: true,
  },
  description: String,
  status: {
    type: String,
    required: true,
  },
  tags: [String],
  lockedPageContent: String
}, { timestamps: true });
