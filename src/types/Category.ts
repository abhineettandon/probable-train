import { Document } from "mongoose";

export interface CategoryInterface extends Document {
  title: String;
}
