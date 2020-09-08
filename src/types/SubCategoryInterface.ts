import { Types } from "mongoose";

import { ContentInterface } from "./ContentInterface";
import { VisibilityStatus } from "./VisibilityStatusEnum";

export type SubCategoryPost = {
  _id: Types.ObjectId;
  title: String;
  description: String;
  body: String;
  status: VisibilityStatus.DRAFT | VisibilityStatus.PUBLISHED;
};

export interface SubCategoryInterface extends ContentInterface {
  posts: SubCategoryPost[];
}
