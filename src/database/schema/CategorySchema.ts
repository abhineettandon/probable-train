import { Schema, Types } from "mongoose";

export const CategorySchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    productId: {
      type: Types.ObjectId,
      ref: "Product",
      required: true,
    },
    parentCategoryId: {
      type: Types.ObjectId,
      ref: "Category",
    },
    status: {
      type: String,
      required: true,
    },
    tags: [String],
    lockedPageContent: String,
    sortOrder: Number,
  },
  { timestamps: true }
);
