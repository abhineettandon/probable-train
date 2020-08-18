import { Model, model } from 'mongoose';

import { ProductCategorySchema } from '../../database/schema/ProductCategorySchema'
import { ProductCategoryInterface } from '../../types/ProductCategoryInterface';

export const ProductCategory: Model<ProductCategoryInterface> = model<ProductCategoryInterface>('ProductCategory', ProductCategorySchema);
