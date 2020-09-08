import { Schema } from "mongoose";

export const SubCategorySchema: Schema = new Schema({
  posts: [
    {
      title: String,
      description: String,
      body: String,
      status: String,
    },
  ],
});
