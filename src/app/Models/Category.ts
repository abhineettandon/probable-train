import { model, Model } from "mongoose";

import { CategoryInterface } from "../../types/CategoryInterface";
import { CategorySchema } from "../../database/schema/CategorySchema";

export const Category: Model<CategoryInterface> = model<CategoryInterface>(
  "Category",
  CategorySchema
);
