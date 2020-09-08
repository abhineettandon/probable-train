import { Types, Document } from "mongoose";

export interface ContentInterface extends Document {
  title: String;
  description: String;
  categoryId: Types.ObjectId;
  kind: String;
}
