import { Model, model } from 'mongoose';

import { CategoryContentInterface } from '../../types/CategoryContentInterface';
import { CategoryContentSchema } from '../../database/schema/CategoryContentSchema';

export const CategoryContent: Model<CategoryContentInterface> = model<CategoryContentInterface>('CategoryContent', CategoryContentSchema);
