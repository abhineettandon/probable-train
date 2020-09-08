import { ContentInterface } from "./ContentInterface";
import { VisibilityStatus } from "./VisibilityStatusEnum";

export interface PostInterface extends ContentInterface {
  body: String;
  status: VisibilityStatus.PUBLISHED | VisibilityStatus.DRAFT;
}
