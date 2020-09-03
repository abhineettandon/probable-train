import { model, Model } from "mongoose";

import { ProductInterface } from "../../types/ProductInterface";
import { ProductSchema } from "../../database/schema/ProductSchema";

export const Product: Model<ProductInterface> = model<ProductInterface>(
  "Product",
  ProductSchema
);
