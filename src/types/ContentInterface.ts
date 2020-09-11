import { Types, Document } from "mongoose";
import { SubCategoryPost } from "./SubCategoryInterface";

import { VisibilityStatus } from "./VisibilityStatusEnum";

export interface ContentInterface extends Document {
  title: String;
  description: String;
  categoryId: Types.ObjectId;
  status: VisibilityStatus.PUBLISHED | VisibilityStatus.DRAFT;
  posts?: SubCategoryPost[];
}
