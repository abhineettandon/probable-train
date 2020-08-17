import { Model, model } from 'mongoose';

import { ProductInterface } from '../../types/ProductInterface';
import { ProductTypeSchema } from '../../database/schema/ProductSchema';

const Product: Model<ProductInterface> = model<ProductInterface>('Product', ProductTypeSchema);

export { Product };
