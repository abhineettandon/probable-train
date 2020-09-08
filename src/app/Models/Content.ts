import { model, Model } from "mongoose";

import { ContentSchema } from "../../database/schema/ContentSchema";

import { ContentInterface } from "../../types/ContentInterface";
import { PostInterface } from "../../types/PostInterface";
import { PostSchema } from "../../database/schema/PostSchema";
import { SubCategorySchema } from "../../database/schema/SubCategorySchema";
import { SubCategoryInterface } from "../../types/SubCategoryInterface";

export const Content: Model<ContentInterface> = model<ContentInterface>(
  "Content",
  ContentSchema
);

export const Post: Model<PostInterface> = Content.discriminator<PostInterface>(
  "Post",
  PostSchema
);

export const SubCategory: Model<SubCategoryInterface> = Content.discriminator<
  SubCategoryInterface
>("SubCategory", SubCategorySchema);
