import { Types, Document } from "mongoose";

import { VisibilityStatus } from "./VisibilityStatusEnum";

export interface ContentInterface extends Document {
  title: String;
  description: String;
  categoryId: Types.ObjectId;
  status: VisibilityStatus.PUBLISHED | VisibilityStatus.DRAFT;
}
