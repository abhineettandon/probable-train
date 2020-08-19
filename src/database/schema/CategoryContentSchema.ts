import { Schema } from 'mongoose'

export const CategoryContentSchema: Schema = new Schema({
  title: {
    type: String,
    required: true
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'ProductCategory',
    required: true,
  },
  description: String,
  body: String,
  status: {
    type: String,
    required: true,
  }
}, { timestamps: true });
