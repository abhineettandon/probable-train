import { Schema } from 'mongoose';

const ProductTypeSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
  },
}, { timestamps: true });

export { ProductTypeSchema };
