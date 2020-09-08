import { Schema } from "mongoose";

export const PostSchema: Schema = new Schema(
  {
    body: String,
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
