import { Schema } from 'mongoose';

const ProductTypeSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  }
}, { timestamps: true });

export { ProductTypeSchema };
