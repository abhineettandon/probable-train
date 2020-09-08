import { ContentInterface } from "./ContentInterface";
import { VisibilityStatus } from "./VisibilityStatusEnum";

type Post = {
  title: String;
  description: String;
  body: String;
  status: VisibilityStatus.DRAFT | VisibilityStatus.PUBLISHED;
};

export interface SubCategoryInterface extends ContentInterface {
  posts: Post[];
}
