import { Schema } from "mongoose";

export const ProductSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    tags: [String],
    lockedPageContent: String,
  },
  { timestamps: true }
);
