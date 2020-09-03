import { Schema } from "mongoose";

export const ProductSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    groupId: {
      type: Schema.Types.ObjectId,
      ref: "Group",
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
