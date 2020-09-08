import { Document, Types } from "mongoose";
import { VisibilityStatus } from "./VisibilityStatusEnum";

export interface CategoryInterface extends Document {
  title: String;
  description: String;
  productId: Types.ObjectId;
  parentCategoryId: Types.ObjectId | null;
  status: VisibilityStatus;
  tags: String[];
  lockedPageContent: String;
  sortOrder?: Number;
}
