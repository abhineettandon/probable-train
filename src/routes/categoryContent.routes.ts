import { Router } from 'express';

import { CategoryContentController } from '../app/Controllers/'

const categoryContent: Router = Router();

categoryContent.post('/', CategoryContentController.save);
categoryContent.get('/:id', CategoryContentController.show);
categoryContent.put('/:id', CategoryContentController.update);
categoryContent.delete('/:id', CategoryContentController.destroy);

export default categoryContent;
