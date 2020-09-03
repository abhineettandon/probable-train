import { Schema } from "mongoose";

export const GroupSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
