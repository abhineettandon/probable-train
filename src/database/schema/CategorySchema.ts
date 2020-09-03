import { Schema } from "mongoose";

export const CategorySchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
