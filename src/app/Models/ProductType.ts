import { Model, model } from 'mongoose';

import { ProductTypeInterface } from '../../types/ProductTypeInterface';
import {ProductTypeSchema } from '../../database/schema/ProductTypeSchema';

const ProductType: Model<ProductTypeInterface> = model<ProductTypeInterface>('ProductType', ProductTypeSchema);

export { ProductType };
