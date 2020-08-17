import { Router } from 'express';

import { ProductController } from '../app/Controllers/ProductController';

const product: Router = Router();

product.get('/', ProductController.index);
product.get('/:id', ProductController.show);
product.post('/', ProductController.save)
product.put('/:id', ProductController.update);

export default product;
