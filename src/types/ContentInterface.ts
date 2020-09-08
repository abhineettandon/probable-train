import { Schema, Document } from "mongoose";

export interface ContentInterface extends Document {
  title: String;
  description: String;
  categoryId: Schema.Types.ObjectId;
  kind: String;
}
