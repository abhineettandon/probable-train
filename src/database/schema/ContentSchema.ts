import { Schema, Types } from "mongoose";

export const ContentSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    categoryId: {
      type: Types.ObjectId,
      required: true,
      ref: "Category",
    },
  },
  { timestamps: true, discriminatorKey: "contentType" }
);
