import { Router } from 'express';

import { ProductTypesController } from '../app/Controllers/';

const productType: Router = Router();

productType.get('/', ProductTypesController.index);
productType.post('/', ProductTypesController.save);
productType.put('/:id', ProductTypesController.update);

export default productType;