import { Router } from 'express';

import { ProductTypesController } from '../app/Controllers/ProductTypesController';

const productType: Router = Router();

productType.get('/', ProductTypesController.index);

export default productType;
