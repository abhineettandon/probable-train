import { Document, Schema } from "mongoose";
import { VisibilityStatus } from "./VisibilityStatusEnum";

export interface ProductInterface extends Document {
  title: String;
  categoryId: Schema.Types.ObjectId;
  description: String;
  status: VisibilityStatus;
  tags: String[];
  lockedPageContent: String;
}
