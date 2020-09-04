import { Document, Schema } from "mongoose";
import { VisibilityStatus } from "./VisibilityStatusEnum";

export interface CategoryInterface extends Document {
  title: String;
  description: String;
  productId: Schema.Types.ObjectId;
  parentCategoryId: Schema.Types.ObjectId | null;
  status: VisibilityStatus;
  tags: String[];
  lockedPageContent: String;
  sortOrder?: Number;
}
