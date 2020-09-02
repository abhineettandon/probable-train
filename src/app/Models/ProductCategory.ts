import { model, Model } from "mongoose";

import { ProductCategoryInterface } from "../../types/ProductCategoryInterface";
import { ProductCategorySchema } from "../../database/schema/ProductCategorySchema";

export const ProductCategory: Model<ProductCategoryInterface> = model<
  ProductCategoryInterface
>("ProductCategory", ProductCategorySchema);
