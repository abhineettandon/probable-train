import { Schema } from "mongoose";

export const PostSchema: Schema = new Schema(
  {
    body: String,
  },
  { timestamps: true }
);
