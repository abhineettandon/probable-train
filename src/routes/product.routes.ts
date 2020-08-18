import { Router } from 'express';

import { ProductController } from '../app/Controllers/';

const product: Router = Router();

product.get('/', ProductController.index);
product.get('/:id', ProductController.show);
product.post('/', ProductController.save)
product.put('/:id', ProductController.update);
product.get('/:id/categories', ProductController.getCategories)

export default product;
