import { Document, Types } from "mongoose";
import { VisibilityStatus } from "./VisibilityStatusEnum";

export interface ProductInterface extends Document {
  title: String;
  groupId: Types.ObjectId;
  description: String;
  status: VisibilityStatus;
  tags: String[];
  lockedPageContent: String;
}
