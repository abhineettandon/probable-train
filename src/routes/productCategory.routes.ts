import { Router } from 'express';

import { ProductCategoryController } from '../app/Controllers/'

const productCategory: Router = Router();

productCategory.get('/:id', ProductCategoryController.show);
productCategory.post('/', ProductCategoryController.save);
productCategory.put('/:id', ProductCategoryController.update);

export default productCategory;
