import { Schema } from "mongoose";

export const ProductCategorySchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
