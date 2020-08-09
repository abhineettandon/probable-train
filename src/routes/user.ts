import { Router } from 'express';

import { UsersControllers } from '../app/Controllers/UsersController';

const user: Router = Router();

user.get('/', UsersControllers.index);
user.get('/:id', UsersControllers.show);
user.put('/:id', UsersControllers.update);
user.delete('/:id', UsersControllers.destroy);
user.put('/:id/reset-password', UsersControllers.resetPassword);

export default user;