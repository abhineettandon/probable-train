import { Schema } from "mongoose";

export const CategorySchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    parentCategoryId: {
      type: Schema.Types.ObjectId,
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
